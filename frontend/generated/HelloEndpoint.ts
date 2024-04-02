import { EndpointRequestInit as EndpointRequestInit_1 } from "@hilla/frontend";
import client_1 from "./connect-client.default.js";
async function sayHello_1(name: string | undefined, init?: EndpointRequestInit_1): Promise<string | undefined> { return client_1.call("HelloEndpoint", "sayHello", { name }, init); }
export { sayHello_1 as sayHello };
