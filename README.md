# Contact Registration
Demo project for Policy-based Access Control. Created in Java Spring Boot with a Vaadin Hilla, Keycloak and Open Policy Agent.

## Description

The Contact Registration feature has no practical use, this project is created to demonstrate the difference between "IN APP" (Currently not implemented) authorizations and "EXTERNAL" or policy-based authorizations.

## Getting Started

### Dependencies

* The front end is based on Vaadin Hilla/React.
* Backend is based on Spring Boot.
* Database is docker-based PostGresSQL. For database administration, PGAdmin4 is available.
* For authentication, Docker-based Keycloak is used, and configured with a new realm, users and roles.
* For external authorization, a Docker-based Open Policy Agent (OPA) is used.
* Docker needs to be installed.

### Installing

* Look in file docker-compose.yml for Docker services and ports!
* To prevent conflict with "localhost" names and services, you might want to edit your localhost file and give e.g. keycloak a hostname e.g. "127.0.0.1 mykeycloak".
* After starting docker containers the first time, log into keycloak "http://mykeycloak:8080/admin/master/console/"
* You don't have to but I recommend that you create a new Keycloak realm.
* In the new realm, start by creating a Keycloak client. You will need to change clientID and clientSecret in the Spring Boot application properties file.
* Create Keycloak users and realm roles.
* Goto (In keycloak): Clients -> "client id" (Newly created client from the step above) -> Click Tab "Client scopes" -> Click on "<client id>-dedicated" -> Click "Add Mapper" -> From predefined mappers -> Select "realm roles", Click "ADD" -> Then click "realm roles" -> In "Token claim name" add: "realm_access\.roles" -> Disable "Add to ID token", Enable "Add to access token" and "Add to userinfo".

### Executing program

* From a terminal, in the projects folder, run:
```
    docker-compose up -d
```
* Run Spring Boot app from e.g. VSCode

### TIPS
* To add data to the database you can use the file "100-contacts.csv" found in the resource-files folder:
* Copy file into container:
* To get the database containers ID, run:
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