package no.sivertsensoftware.contactregistration.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import jakarta.annotation.security.PermitAll;
import no.sivertsensoftware.contactregistration.model.Contact;
import no.sivertsensoftware.contactregistration.service.ContactService;
import no.sivertsensoftware.contactregistration.service.OpaauthorizationService;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@BrowserCallable
@AnonymousAllowed
@Configuration
@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService contactService;
    private final OpaauthorizationService authorizationService;

    public ContactController(ContactService contactService, OpaauthorizationService authorizationService) {
        this.contactService = contactService;
        this.authorizationService = authorizationService;
    }

    @PermitAll
    public boolean isAdmin() {
    
        String hasWritePermission = authorizationService.getUserHasWritePermission();

        if (hasWritePermission == "true") {
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/contact")
    public Iterable<Contact> findAll() {
        return contactService.findAll();
    }
    @GetMapping("/contact/firstname/{firstname}")
    public List<Contact> findByFirstname(@PathVariable("firstname") String firstname) {
        List<Contact> listOfContacts = contactService.findByFirstName(firstname);
        return listOfContacts;
    }
    @GetMapping("/contact/lastname/{lastname}")
    public List<Contact> findByLastname(@PathVariable("lastname") String lastname) {
        List<Contact> listOfContacts = contactService.findByLastName(lastname);
        return listOfContacts;
    }
    @GetMapping("/contact/email/{email}")
    public List<Contact> findByEmail(@PathVariable("email") String email) {
        List<Contact> listOfContacts = contactService.findByEmail(email);
        return listOfContacts;
    }
    @GetMapping("/contact/phonenumber/{phonenumber}")
    public List<Contact> findByPhonenumber(@PathVariable("phonenumber") String phonenumber) {
        List<Contact> listOfContacts = contactService.findByPhonenumber(phonenumber);
        return listOfContacts;
    }

    @PreAuthorize("@contactController.isAdmin()")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/contact")
    public Contact createContact(@RequestBody Contact contact) {
        Contact saved = contactService.createContact(contact);
        return saved;
    }

    @PreAuthorize("@contactController.isAdmin()")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/contact/{id}")
    public void update(@RequestBody Contact contact, @PathVariable("id") Long id) {
        if (!contactService.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found!");
        }
        contactService.updateContact(contact, id);
    }

    @PreAuthorize("@contactController.isAdmin()")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/contact/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        return contactService.deleteById(id);
    }
}
