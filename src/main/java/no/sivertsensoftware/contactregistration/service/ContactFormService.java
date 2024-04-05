package no.sivertsensoftware.contactregistration.service;
import org.springframework.stereotype.Service;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.crud.CrudRepositoryService;
import no.sivertsensoftware.contactregistration.model.Contact;
import no.sivertsensoftware.contactregistration.repository.ContactRepository;

@BrowserCallable
@AnonymousAllowed
@Service
public class ContactFormService extends CrudRepositoryService<Contact, Long, ContactRepository>{
    
}
