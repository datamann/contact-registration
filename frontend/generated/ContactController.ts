import { EndpointRequestInit as EndpointRequestInit_1 } from "@hilla/frontend";
import client_1 from "./connect-client.default.js";
import type Contact_1 from "./no/sivertsensoftware/contactregistration/model/Contact.js";
async function createContact_1(contact: Contact_1 | undefined, init?: EndpointRequestInit_1): Promise<Contact_1 | undefined> { return client_1.call("ContactController", "createContact", { contact }, init); }
async function deleteById_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<string | undefined> { return client_1.call("ContactController", "deleteById", { id }, init); }
async function findAll_1(init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactController", "findAll", {}, init); }
async function findByEmail_1(email: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactController", "findByEmail", { email }, init); }
async function findByFirstname_1(firstname: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactController", "findByFirstname", { firstname }, init); }
async function findByLastname_1(lastname: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactController", "findByLastname", { lastname }, init); }
async function findByPhonenumber_1(phonenumber: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactController", "findByPhonenumber", { phonenumber }, init); }
async function isAdmin_1(init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("ContactController", "isAdmin", {}, init); }
async function update_1(contact: Contact_1 | undefined, id: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ContactController", "update", { contact, id }, init); }
export { createContact_1 as createContact, deleteById_1 as deleteById, findAll_1 as findAll, findByEmail_1 as findByEmail, findByFirstname_1 as findByFirstname, findByLastname_1 as findByLastname, findByPhonenumber_1 as findByPhonenumber, isAdmin_1 as isAdmin, update_1 as update };
