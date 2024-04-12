package no.sivertsensoftware.contactregistration.config;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class OPADataRequest {
    Map<String, Object> input;
}