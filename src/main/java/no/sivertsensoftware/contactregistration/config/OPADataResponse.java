package no.sivertsensoftware.contactregistration.config;

import java.util.Map;

import lombok.Data;

@Data
public class OPADataResponse {

    private OPAResult result;

    @Data
    public static class OPAResult{
        private Boolean allow;
        Map<String, String> eval;
    }
    
}