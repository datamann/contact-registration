# Contact Registration
Demo project for Policy-based Access Control. Created in Java Spring Boot with a Vaadin Hilla, Keycloak and Open Policy Agent.

## Description

The Contact Registration feature has no practical use, this project is created to demonstrate the difference between "IN APP" (Currently not implemented) authorizations and "EXTERNAL" or policy-based authorizations.

## Uses cases this project tries to demonstrate:
* Use case #1:
* Company needs to be able to lower it's risk by dynamically changing employees permissions to only allow access to IT-systems when on the roster list.

* Use case #2:
* Company needs to be able to lower it's risk by dynamically changing employees permissions with e.g. full access at the office and "read-only" access from home.

* Use case #3:
* Company needs to be able to lower it's risk by dynamically changing employees permissions if an employee is on sick leave or other approved leave of absence, this should be based on HR data.

## Getting Started

### Dependencies

* The front end is based on Vaadin Hilla/React.
* Backend is based on Spring Boot.
* Database is docker-based PostGresSQL. For database administration, PGAdmin4 is available.
* For authentication, Docker-based Keycloak is used, and configured with a new realm, users and roles. If you don't want to configure Keycloak from scratch, just copy the keycloak folder from the resources-files directory to the root of this project.
* For external authorization, a Docker-based Open Policy Agent (OPA) is used.
* Docker needs to be installed.

### Installing

* Look in file docker-compose.yml for Docker services and ports!
* To prevent conflict with "localhost" names and services, you might want to edit your localhost file and give e.g. keycloak a hostname e.g. "127.0.0.1 mykeycloak".
* After starting docker containers the first time, log into keycloak "http://mykeycloak:8080/admin/master/console/"
* You don't have to but I recommend that you create a new Keycloak realm.
* In the new realm, start by creating a Keycloak client. You will need to change clientID and clientSecret in the Spring Boot application properties file.
*
* Before you can test how authorization with roles or user attributes work, you need to create Keycloak users, realm roles and user attributes.
* First make sure that you have selected the right realm in Keycloak.
*
* To make user roles available in the users token:
* Goto (In keycloak):Clients -> "client id" (Newly created client from the step above) -> Click Tab "Client scopes" -> Click on "<client id>-dedicated" -> Click "Add Mapper" -> From predefined mappers -> Select "realm roles", Click "ADD" -> Then click "realm roles" -> In "Token claim name" add: "realm_access\.roles" -> Disable "Add to ID token", Enable "Add to access token" and "Add to userinfo".
*
* To make user attributes available in the users token:
* Goto (In keycloak): Clients -> "client id" (Newly created client from the step above) -> Click Tab "Client scopes" -> Click on "-dedicated" -> Click "Add Mapper" -> By Configuratioon -> Select "User Attribute", Click "ADD" -> Then click "User Attribute" -> In "Token claim name" add: "authorizations" -> Disable "Add to ID token", Enable "Add to access token" and "Add to userinfo" and "Multivalued" and click Save.
*
* To add users:
* Goto (In keycloak): In the menu on the lefthand side, click Users -> "Add user", provide a username (only "Username" is mandatory) and click "Create". Then click the "Credentials" tab, click "Set password" and provide a password, and uncheck "Temporary", then click "Save" -> "Save passord".
* Learn more here: [Keycloak managing users](https://www.keycloak.org/docs/latest/server_admin/#assembly-managing-users_server_administration_guide)
*
* Now you need to create roles and attributes.
* Create roles:
* Goto (In keycloak): In the menu on the lefthand side, click "Realm roles" -> "Create role" -> enter "Role name", click "Save".
* Learn more here: [Keycloak Assigning permissions using roles and groups](https://www.keycloak.org/docs/latest/server_admin/index.html#assigning-permissions-using-roles-and-groups)
*
* Add user attributes:
* Goto (In keycloak): In the menu on the lefthand side, click Users -> click the user you created in previous step, click "Attributes" tab and click "Add an attribute". Enter attribute name in the "Key" field and enter attribute value in the "Value" field, then click "Save".
* Learn more here: [Keycloak managing user attributes](https://www.keycloak.org/docs/latest/server_admin/#user-profile)

### Executing program

* From a terminal, in the projects folder, run:
```
    docker-compose up -d
```
* Run Spring Boot app from e.g. VSCode

### TIPS
* To add data to the database you can use the file "100-contacts.csv" found in the resource-files folder:
* Copy file into container:
* To get the database container id, run:
```
    docker ps
```
* Replace "container id" (remove the angle brackets!) with the container ID found above
```
    docker cp resource-files/100-contacts.csv <container id>:/home/contacts.csv
```
*
* Log into PGAdmin4, add a connection to the database and run this SQL command:
```
    COPY contact(firstname, lastname, companyname, address, city, county, state, zip, phonenumber, phonenumber2, email)
    FROM '/home/contacts.csv'
    DELIMITER ','
    CSV HEADER;
```


* Troubleshooting OPA
* To query OPA:
```
  curl -X POST http://localhost:8181/v1/data/dnb/userregistration/auth -d @./data.json -H 'Content-Type: application/json'
```
* To look at OPA document structure:
```
  ./opa run ../OPA/input.json
```
* [See Open Policy Documentation](https://www.openpolicyagent.org/docs/latest/#3-try-opa-run-interactive)

### Useful tools:
* [JWT.IO](https://jwt.io/)
* [Stringify](https://jsonformatter.org/json-stringify-online)
* [JSON Formatter and validator](https://jsonformatter.curiousconcept.com/#)

## Authors

Idea by and coding is done by:
Stig Børje Sivertsen
ex. [@StigSivertsen](https://twitter.com/stigsivertsen)

## Version History

* 1.0

## License

This project is licensed under the GNU GPLv3 License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [Spring.io](https://spring.io/)
* [Vaadin](https://vaadin.com/)
* [Hilla](https://hilla.dev/)
* [OpenPoliyAgent](https://www.openpolicyagent.org/)