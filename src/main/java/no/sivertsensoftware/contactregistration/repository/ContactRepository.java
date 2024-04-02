package no.sivertsensoftware.contactregistration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import no.sivertsensoftware.contactregistration.model.Contact;


public interface ContactRepository extends JpaRepository<Contact, Long>, JpaSpecificationExecutor<Contact> {
    List<Contact> findByFirstname(String firstname);
    List<Contact> findByLastname(String lastname);
    List<Contact> findByEmail(String email);
    List<Contact> findByPhonenumber(String phonenumber);
    List<Contact> findByPhonenumber2(String phonenumber);

    @Modifying
    @Transactional
    @Query(value = "update Contact c set c.firstname = :firstname, c.lastname = :lastname, c.companyname = :companyname, c.address = :address, c.city = :city, c.county = :county, c.state = :state, c.zip = :zip, c.phonenumber = :phonenumber, c.phonenumber2 = :phonenumber2, c.email = :email where c.id = :id")
    int updateContact(@Param("id") Long id, @Param("firstname") String firstname, @Param("lastname") String lastname, @Param("companyname") 
                        String companyname, @Param("address") String address, @Param("city") String city, @Param("county") String county, @Param("state") 
                        String state, @Param("zip") String zip, @Param("phonenumber") String phonenumber, @Param("phonenumber2") 
                        String phonenumber2, @Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "Delete FROM Contact c WHERE c.id = :id")
    void deleteByLongId(@Param("id") Long id);
}