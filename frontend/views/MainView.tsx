import { Button } from "@hilla/react-components/Button.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { ContactService, HelloEndpoint } from "Frontend/generated/endpoints.js";
import { useState } from "react";
import {AutoGrid } from "@hilla/react-crud";
import ContactModel from "Frontend/generated/no/sivertsensoftware/contactregistration/model/ContactModel";

export default function MainView() {
  const [name, setName] = useState("");

  return (
    <div className="p-m h-full box-border">
      <AutoGrid service={ContactService} model={ContactModel} className="h-full"/>
    </div>
  );
}
