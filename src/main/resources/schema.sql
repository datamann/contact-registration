-- Contact
CREATE TABLE IF NOT EXISTS contact(
    id SERIAL primary key,
    firstname varchar(50) not null,
    lastname  varchar(50) not null,
    companyname varchar(50),
    address varchar(50),
    city varchar(50),
    county varchar(50),
    state varchar(50),
    zip varchar(50),
    phonenumber varchar(50),
    phonenumber2 varchar(50),
    email varchar(80) not null
);