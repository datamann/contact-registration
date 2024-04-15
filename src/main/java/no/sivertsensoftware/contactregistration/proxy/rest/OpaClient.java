package no.sivertsensoftware.contactregistration.proxy.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import no.sivertsensoftware.contactregistration.config.OPADataRequest;
import no.sivertsensoftware.contactregistration.config.OPADataResponse;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "opaAuthorization", url = "${app.opa.authz.url}")

@RestController
public interface OpaClient {

    @PostMapping("company/contactregistration")
    OPADataResponse authorizedToAccessAPI(@RequestBody OPADataRequest opaDataRequest);
}