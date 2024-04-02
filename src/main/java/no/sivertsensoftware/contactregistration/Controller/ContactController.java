package no.sivertsensoftware.contactregistration.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import no.sivertsensoftware.contactregistration.model.Contact;
import no.sivertsensoftware.contactregistration.service.ContactService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/contact")
    public Contact createContact(@RequestBody Contact contact) {
        Contact saved = contactService.createContact(contact);
        return saved;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/contact/{id}")
    public void update(@RequestBody Contact contact, @PathVariable("id") Long id) {
        if (!contactService.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact not found!");
        }
        contactService.updateContact(contact, id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/contact/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        return contactService.deleteById(id);
    }
}
