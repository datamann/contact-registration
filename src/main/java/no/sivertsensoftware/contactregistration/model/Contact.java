package no.sivertsensoftware.contactregistration.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name="contact")
public final class Contact {

    @Id
    @SequenceGenerator(name = "contactSequence", sequenceName = "contact_seq")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @NotEmpty
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Column(name = "firstname", length = 50, nullable = false, unique = false)
    private String firstname;

    @NotEmpty
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Column(name = "lastname", length = 50, nullable = false, unique = false)
    private String lastname;
   
    @Column(name = "companyname", length = 50, nullable = true, unique = false)
    private String companyname;

    @Column(name = "address", length = 50, nullable = true, unique = false)
    private String address;

    @Column(name = "city", length = 50, nullable = true, unique = false)
    private String city;

    @Column(name = "county", length = 50, nullable = true, unique = false)
    private String county;

    @Column(name = "state", length = 50, nullable = true, unique = false)
    private String state;

    @Column(name = "zip", length = 50, nullable = true, unique = false)
    private String zip;

    @Column(name = "phonenumber", length = 50, nullable = true, unique = false)
    private String phonenumber;

    @Column(name = "phonenumber2", length = 50, nullable = true, unique = false)
    private String phonenumber2;

    @NotEmpty
    @Email
    @Column(name = "email", nullable = false, unique = false)
    private String email;
}
