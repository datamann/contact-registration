import { Button } from "@hilla/react-components/Button.js";
//import { TextField } from "@hilla/react-components/TextField.js";
//import { EmailField } from "@hilla/react-components/EmailField.js";
import { Tooltip } from "@hilla/react-components/Tooltip.js";
import { Notification } from "@hilla/react-components/Notification.js";
//import { useForm } from '@hilla/react-form';
import React, { useEffect, useState } from "react";
import { AutoForm, AutoGrid, AutoGridRef } from "@hilla/react-crud";
import { GridColumn, GridColumnElement } from "@hilla/react-components/GridColumn";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import { ContactService } from "Frontend/generated/endpoints";
import { ContactFormService } from "Frontend/generated/endpoints";
import ContactModel from "Frontend/generated/no/sivertsensoftware/contactregistration/model/ContactModel";
import Contact from "../generated/no/sivertsensoftware/contactregistration/model/Contact";
import { ContactController } from "Frontend/generated/endpoints";
import AddContact from "../components/AddContact";


export default function MainView() {
  const [items, setItems] = useState<Contact[]>();
  const [isadmin, setIsAdmin] = useState<boolean>();
  const [buttonAddContact, setButtonAddContact] = useState(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [editedItem, setEditedItem] = useState<Contact | null>(null);

  useEffect(() => {
    isAdmin();
  }, []);

  async function isAdmin() {
    setIsAdmin(await ContactController.isAdmin().catch(() => false));
  }

  // async function createContact(contact: Contact) {
  //   await ContactController.createContact(contact);
  // }

  // function contactToCreate(contact: Contact) {
  //   const contactCreated = createContact(contact);

  //   function handleReplyCreateContact(){
  //     autoGridRef.current?.refresh();
  //   }

  //   function contactNotCreated() {
  //     alert('Contact NOT created!');
  //   }
  //   contactCreated.then(handleReplyCreateContact,contactNotCreated);
  // };

  // const { model, field, read, submit } = useForm(ContactModel, {
  //   onSubmit: async (contact: Contact) => {
  //     contactToCreate(contact);
  //   }
  // });

  const handleSubmitSuccess = ({ item }: { item: Contact }) => {
    Notification.show('Form was submitted!');
    autoGridRef.current?.refresh();
  };

  const handleEdit = () => {
    setEditedItem(editedItem);
  };

  async function deleteContact(id: number) {
    await ContactController.deleteById(id);
  }

  function deleteSelectedContact(id: number, contact: ContactModel) {

    const contactToDelete = deleteContact(id);

    function handleReplyDeleted() {
      autoGridRef.current?.refresh();
    }

    function handleReply(){
      alert('Contact NOT deleted!');
    }

    contactToDelete.then(handleReplyDeleted, handleReply);
  };

  return (
    <>
     <AddContact trigger={buttonAddContact} setTrigger={setButtonAddContact}>
      <AutoForm 
          service={ContactFormService} 
          model={ContactModel}
          item={editedItem}
          onSubmitSuccess={handleSubmitSuccess} 
      />
     {/* <form className="flex flex-col gap-y-2">
      <div>

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
      <br />

      <TextField label="Address" {...field(model.address)}
        name="address"
        placeholder="Address"
        autocomplete="address"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter address!" />
      </TextField>

      <TextField label="Zip code" {...field(model.zip)}
        name="zip"
        placeholder="Zip code"
        autocomplete="zip"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter zip code!" />
      </TextField>

      <TextField label="City" {...field(model.city)}
        name="city"
        placeholder="City"
        autocomplete="city"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter city!" />
      </TextField>
      <br />

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
      <br />

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
      <br />

      <EmailField className="gap-s" {...field(model.email)}
        label="E-Mail"
        name="email"
        placeholder="E-Mail"
        autocomplete="on"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter a valid email address!" />
      </EmailField>

      <TextField label="Company Name" {...field(model.companyname)}
        name="companyname"
        placeholder="Company Name"
        autocomplete="company-name"
        disabled={!isadmin}>
        <Tooltip slot="tooltip" text="Enter company name!" />
      </TextField>

      <Button id="btndel" disabled={!isadmin} theme="primary" onClick={submit}>
      <Tooltip slot="tooltip" text="Click, too add contact!" />
        Submit
      </Button>

      </div>
    </form> */}
    </AddContact>
    <div className="p-m h-full box-border content-center">
      <AutoGrid
        service={ContactService}
        ref={autoGridRef}
        model={ContactModel} className="h-full"
        visibleColumns={['actions','edit','firstname','lastname','email','phonenumber','phonenumber2','companyname','address','city','county','state','zip','country']}
        customColumns={[  
          <GridColumn header="Actions" key="actions" autoWidth className="background" property="actions"
            renderer={({ item: Contact }) => (<Button theme="primary" disabled={!isadmin} onClick={(item) => { deleteSelectedContact(Contact.id, Contact); }}>Delete</Button>)}>
          </GridColumn>,

          <GridColumn header="Edit" key="edit" autoWidth className="background" property="edit"
            renderer={({ item: Contact }) => (
              <Button theme="primary" 
                disabled={!isadmin} 
                onClick={(item) => {
                  setEditedItem(Contact)
                  setButtonAddContact(true)
                }}>Edit
              </Button>
            )}>
          </GridColumn>,
        ]}
        />
      <Button id="btnAddContact" disabled={!isadmin} theme="primary" onClick={() => {
          setEditedItem(null)
          setButtonAddContact(true)
        }
      }>
      <Tooltip slot="tooltip" text="Add contact!"/>
        Add Contact
      </Button>
    </div>
    </>
  );
}
