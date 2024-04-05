import { EndpointRequestInit as EndpointRequestInit_1 } from "@hilla/frontend";
import client_1 from "./connect-client.default.js";
import type Filter_1 from "./dev/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./dev/hilla/mappedtypes/Pageable.js";
import type Contact_1 from "./no/sivertsensoftware/contactregistration/model/Contact.js";
async function count_1(filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<number> { return client_1.call("ContactFormService", "count", { filter }, init); }
async function exists_1(id: number, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("ContactFormService", "exists", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<Contact_1 | undefined> { return client_1.call("ContactFormService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Contact_1>> { return client_1.call("ContactFormService", "list", { pageable, filter }, init); }
async function delete_1(id: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ContactFormService", "delete", { id }, init); }
async function deleteAll_1(ids: Array<number>, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ContactFormService", "deleteAll", { ids }, init); }
async function save_1(value: Contact_1, init?: EndpointRequestInit_1): Promise<Contact_1 | undefined> { return client_1.call("ContactFormService", "save", { value }, init); }
async function saveAll_1(values: Array<Contact_1>, init?: EndpointRequestInit_1): Promise<Array<Contact_1>> { return client_1.call("ContactFormService", "saveAll", { values }, init); }
export { count_1 as count, delete_1 as delete, deleteAll_1 as deleteAll, exists_1 as exists, get_1 as get, list_1 as list, save_1 as save, saveAll_1 as saveAll };
