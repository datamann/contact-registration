package no.sivertsensoftware.contactregistration.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.crud.ListRepositoryService;
import no.sivertsensoftware.contactregistration.repository.ContactRepository;
import no.sivertsensoftware.contactregistration.model.Contact;

@BrowserCallable
@AnonymousAllowed
@Service
public class ContactService extends ListRepositoryService<Contact, Long, ContactRepository>{

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll(){
        return contactRepository.findAll();
    }

    public List<Contact> findByFirstName(String firstname){
        return contactRepository.findByFirstname(firstname);
    }

    public List<Contact> findByLastName(String lastname){
        return contactRepository.findByLastname(lastname);
    }

    public List<Contact> findByEmail(String email){
        return contactRepository.findByEmail(email);
    }

    public List<Contact> findByPhonenumber(String phonenumber){

        List<Contact> phonenum = contactRepository.findByPhonenumber(phonenumber);
        System.out.println("----- Phonenumber ----- Phonenumber is: " + phonenum.toString());

        // if ( phonenum.toString() != "[]" ){
        //     return contactRepository.findByPhonenumber(phonenumber);

        // } else if(contactRepository.findByPhonenumber2(phonenumber) != null || !contactRepository.findByPhonenumber2(phonenumber).isEmpty()){
        //     contactRepository.findByPhonenumber2(phonenumber);
        // }
        return null;
    }

    @SuppressWarnings("null")
    public Contact createContact(Contact contact){
        return contactRepository.save(contact);
    }

    public void updateContact(Contact contact, Long id){
        contactRepository.updateContact(id , contact.getFirstname(), contact.getLastname(), contact.getCompanyname(), contact.getAddress(),
                                        contact.getCity(), contact.getCounty(), contact.getState(), contact.getZip(), contact.getPhonenumber(), 
                                        contact.getPhonenumber2(), contact.getEmail());
    }

    @SuppressWarnings("null")
    public boolean existsById(Long id) {
        return contactRepository.existsById(id);
    }

    public String deleteById(Long id){
        if (existsById(id)){
            contactRepository.deleteByLongId(id);
            return "Contact has been deleted!";
        } else {
            return "Contact not found!";
        }
    }
}
