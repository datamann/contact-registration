import { Button } from "@hilla/react-components/Button.js";
import { Tooltip } from "@hilla/react-components/Tooltip.js";
import { Notification } from "@hilla/react-components/Notification.js";
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
import '../components/style.css'


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
    </AddContact>
    <AutoGrid
      service={ContactService}
      model={ContactModel}
      ref={autoGridRef}
      className="h-full"
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
      }}>
      <Tooltip slot="tooltip" text="Add contact!"/>
        Add Contact
      </Button>
    </>
  );
}
