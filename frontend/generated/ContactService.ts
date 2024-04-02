import { EndpointRequestInit as EndpointRequestInit_1 } from "@hilla/frontend";
import client_1 from "./connect-client.default.js";
import type Filter_1 from "./dev/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./dev/hilla/mappedtypes/Pageable.js";
import type Contact_1 from "./no/sivertsensoftware/contactregistration/model/Contact.js";
async function count_1(filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<number> { return client_1.call("ContactService", "count", { filter }, init); }
async function exists_1(id: number, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("ContactService", "exists", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<Contact_1 | undefined> { return client_1.call("ContactService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1>> { return client_1.call("ContactService", "list", { pageable, filter }, init); }
async function createContact_1(contact: Contact_1 | undefined, init?: EndpointRequestInit_1): Promise<Contact_1 | undefined> { return client_1.call("ContactService", "createContact", { contact }, init); }
async function deleteById_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<string | undefined> { return client_1.call("ContactService", "deleteById", { id }, init); }
async function existsById_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("ContactService", "existsById", { id }, init); }
async function findAll_1(init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactService", "findAll", {}, init); }
async function findByEmail_1(email: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactService", "findByEmail", { email }, init); }
async function findByFirstName_1(firstname: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactService", "findByFirstName", { firstname }, init); }
async function findByLastName_1(lastname: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactService", "findByLastName", { lastname }, init); }
async function findByPhonenumber_1(phonenumber: string | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1 | undefined> | undefined> { return client_1.call("ContactService", "findByPhonenumber", { phonenumber }, init); }
async function updateContact_1(contact: Contact_1 | undefined, id: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ContactService", "updateContact", { contact, id }, init); }
export { count_1 as count, createContact_1 as createContact, deleteById_1 as deleteById, exists_1 as exists, existsById_1 as existsById, findAll_1 as findAll, findByEmail_1 as findByEmail, findByFirstName_1 as findByFirstName, findByLastName_1 as findByLastName, findByPhonenumber_1 as findByPhonenumber, get_1 as get, list_1 as list, updateContact_1 as updateContact };
