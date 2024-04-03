import { Button } from "@hilla/react-components/Button.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { EmailField } from "@hilla/react-components/EmailField.js";
import { Tooltip } from "@hilla/react-components/Tooltip.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { useForm } from '@hilla/react-form';
import { useEffect, useState } from "react";
import { AutoGrid } from "@hilla/react-crud";
import { GridColumn, GridColumnElement } from "@hilla/react-components/GridColumn";
import { ContactService } from "Frontend/generated/endpoints";
import ContactModel from "Frontend/generated/no/sivertsensoftware/contactregistration/model/ContactModel";
import Contact from "../generated/no/sivertsensoftware/contactregistration/model/Contact";
import { ContactController } from "Frontend/generated/endpoints";


export default function MainView() {
  const [items, setItems] = useState<Contact[]>();
  const [isadmin, setIsAdmin] = useState<boolean>();

  useEffect(() => {
    // const getAllUsers = async () => {
    //   const result: any = await ContactController.findAll();
    //  setItems(result);
    //};
    //getAllUsers();
    isAdmin();
  }, []);

  async function isAdmin() {
    setIsAdmin(await ContactController.isAdmin().catch(() => false));
  }

  async function createContact(contact: Contact) {
    await ContactController.createContact(contact);
  }

  function contactToCreate(contact: Contact) {
    const contactCreated = createContact(contact); 

    function handleReplyCreateContact(){
      setItems([...items!,contact]);
    }

    function contactNotCreated() {
      alert('Contact NOT created!');
    }
    contactCreated.then(handleReplyCreateContact,contactNotCreated);
  };

  const { model, field, read, submit } = useForm(ContactModel, {
    onSubmit: async (contact: Contact) => {
      contactToCreate(contact);
    }
  });

  async function deleteContact(id: number) {
    await ContactController.deleteById(id);
  }

  function deleteSelectedContact(id: any, contact: ContactModel) {

    const contactToDelete = deleteContact(id);

    function handleReplyDeleted() {
      const update = items!.filter((contact) => id !== contact.id);
      setItems(update);
    }

    function handleReply(){
      alert('Contact NOT deleted!');
    }

    contactToDelete.then(handleReplyDeleted, handleReply);
  };

  return (
    <>
    <form className="flex flex-col gap-y-2">
      <TextField label="First name" {...field(model.firstname)}
        name="firstname"
        placeholder="First name"
        autocomplete="given-name"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter first name!" />
      </TextField>
      
      <TextField label="Last name" {...field(model.lastname)}
        name="lastname"
        placeholder="Last name"
        autocomplete="family-name"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter last name!" />
      </TextField>

      <TextField label="Company Name" {...field(model.companyname)}
        name="companyname"
        placeholder="Company Name"
        autocomplete="company-name"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter company name!" />
      </TextField>

      <TextField label="Address" {...field(model.address)}
        name="address"
        placeholder="Address"
        autocomplete="address"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter address!" />
      </TextField>

      <TextField label="City" {...field(model.city)}
        name="city"
        placeholder="City"
        autocomplete="city"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter city!" />
      </TextField>

      <TextField label="County" {...field(model.county)}
        name="county"
        placeholder="County"
        autocomplete="county"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter county!" />
      </TextField>

      <TextField label="State" {...field(model.state)}
        name="state"
        placeholder="State"
        autocomplete="state"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter state!" />
      </TextField>

      <TextField label="Zip code" {...field(model.zip)}
        name="zip"
        placeholder="Zip code"
        autocomplete="zip"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter zip code!" />
      </TextField>

      <TextField label="Primary Phonenumber" {...field(model.phonenumber)}
        name="phonenumber"
        placeholder="Primary Phonenumber"
        autocomplete="phonenumber"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter your primary phonenumber!" />
      </TextField>

      <TextField label="Second Phonenumber" {...field(model.phonenumber2)}
        name="phonenumber2"
        placeholder="Second Phonenumber"
        autocomplete="phonenumber2"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter your second phonenumber!" />
      </TextField>

      <EmailField className="gap-s" {...field(model.email)}
        label="E-Mail"
        name="email"
        placeholder="E-Mail"
        autocomplete="on"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter a valid email address!" />
      </EmailField>

      <Button disabled={!isadmin} theme="primary" onClick={submit}>
      <Tooltip slot="tooltip" text="Click, too add contact!" />
        Submit
      </Button>

    <div className="p-m h-full box-border">
      <AutoGrid items={items}
        service={ContactService} 
        model={ContactModel} className="h-full"
        customColumns={[
          <GridColumn header="Actions" path="actions" autoWidth className="background" 
            renderer={({ item: Contact }) => (<Button theme="primary" disabled={!isadmin} onClick={(item) => { deleteSelectedContact(Contact.id, Contact); }}>Delete</Button>)}>
          </GridColumn>,
        ]}
        />
    </div>
    </form>
    </>
  );
}
