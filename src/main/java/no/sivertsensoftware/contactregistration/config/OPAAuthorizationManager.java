package no.sivertsensoftware.contactregistration.config;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;
import org.springframework.security.core.Authentication;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import no.sivertsensoftware.contactregistration.proxy.rest.OpaClient;
import no.sivertsensoftware.contactregistration.service.OpaauthorizationService;

@Component
public class OPAAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    private final OpaClient opaClient;
    private final ObjectMapper objectMapper;
    private final OpaauthorizationService authorizationService;

    public OPAAuthorizationManager( OpaClient opaClient, ObjectMapper objectMapper, OpaauthorizationService authorizationService)
    {
        this.opaClient = opaClient;
        this.objectMapper = objectMapper;
        this.authorizationService = authorizationService;
    }

    @Override
    @SneakyThrows
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext requestAuthorizationContext) {

        var httpServletRequest = requestAuthorizationContext.getRequest();

        String[] path = httpServletRequest.getRequestURI().replaceAll("^/|/$", "").split("/");

        ContentCachingHttpServletRequest contentCachingHttpServletRequest = WebUtils.getNativeRequest(httpServletRequest, ContentCachingHttpServletRequest.class);

        Map<String, Object> input = new HashMap<>();

        input.put("user", authentication.get().getPrincipal());
        input.put("method", httpServletRequest.getMethod());
        input.put("path", path);
        input.put("payload", objectMapper.readTree(contentCachingHttpServletRequest.getInputStream()));

        OPADataResponse opaDataResponse = opaClient.authorizedToAccessAPI(new OPADataRequest(input));

        /*
         * Verifies the data from OPA and saves the response into an authorization model.
         */
        String allow = opaDataResponse.getResult().getEval().get("allow");
        if (allow != null) {
            authorizationService.setAllow(allow);
        } else {
            authorizationService.setAllow("false");
        }

        String not_denied = opaDataResponse.getResult().getEval().get("not_denied");
        if (not_denied != null){
            authorizationService.setNotDenied(not_denied);
        } else {
            authorizationService.setNotDenied("false");
        }

        String user_read_permission = opaDataResponse.getResult().getEval().get("user_read_permission");
        if (!(user_read_permission == "null" || user_read_permission == null)){
            authorizationService.setReadPermission(user_read_permission);
        } else {
            authorizationService.setReadPermission("false");
        }

        String user_write_permission = opaDataResponse.getResult().getEval().get("user_write_permission");
        if (!(user_write_permission == null || user_write_permission == "null")){
            authorizationService.setWritePermission(user_write_permission);
        } else {
             authorizationService.setWritePermission("false");
        }

        String user_converted_to_read_only = opaDataResponse.getResult().getEval().get("user_converted_to_read_only");
        if (!(user_converted_to_read_only == null  || user_converted_to_read_only == "null")) {
            authorizationService.setReadOnlyPermission(user_converted_to_read_only);
        } else {
            authorizationService.setReadOnlyPermission("false");
        }

        /*
         * Lets check if user has effective write permissions!
         */
        
        if (authorizationService.getNotDenied() == "true" && authorizationService.getWritePermission() == "false" && authorizationService.getReadPermission() == "false") {
            authorizationService.setUserHasWritePermission("false");

        } else if ( authorizationService.getReadPermission() == "true" || authorizationService.getReadOnlyPermission() == "true" ){
            authorizationService.setUserHasWritePermission("false");

        } else if ( authorizationService.getWritePermission() == "true" || authorizationService.getReadOnlyPermission() == "false" ){
            authorizationService.setUserHasWritePermission("true");

        } else if ( authorizationService.getWritePermission() == "false" || authorizationService.getReadOnlyPermission() == "false" ){
            authorizationService.setUserHasWritePermission("false");
        
        } else {
            authorizationService.setUserHasWritePermission("false");
        }

        return new AuthorizationDecision(opaDataResponse.getResult().getAllow());
    }
}