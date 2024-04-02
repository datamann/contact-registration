import { _getPropertyModel as _getPropertyModel_1, Email as Email_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotEmpty as NotEmpty_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, Size as Size_1, StringModel as StringModel_1 } from "@hilla/form";
import type Contact_1 from "./Contact.js";
class ContactModel<T extends Contact_1 = Contact_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(ContactModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.Long" } }));
    }
    get firstname(): StringModel_1 {
        return this[_getPropertyModel_1]("firstname", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotEmpty_1(), new Size_1({ min: 2, max: 50, message: "First name must be between 2 and 50 characters" })], meta: { javaType: "java.lang.String" } }));
    }
    get lastname(): StringModel_1 {
        return this[_getPropertyModel_1]("lastname", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotEmpty_1(), new Size_1({ min: 2, max: 50, message: "Last name must be between 2 and 50 characters" })], meta: { javaType: "java.lang.String" } }));
    }
    get companyname(): StringModel_1 {
        return this[_getPropertyModel_1]("companyname", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get address(): StringModel_1 {
        return this[_getPropertyModel_1]("address", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get city(): StringModel_1 {
        return this[_getPropertyModel_1]("city", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get county(): StringModel_1 {
        return this[_getPropertyModel_1]("county", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get state(): StringModel_1 {
        return this[_getPropertyModel_1]("state", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get zip(): StringModel_1 {
        return this[_getPropertyModel_1]("zip", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get phonenumber(): StringModel_1 {
        return this[_getPropertyModel_1]("phonenumber", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get phonenumber2(): StringModel_1 {
        return this[_getPropertyModel_1]("phonenumber2", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get email(): StringModel_1 {
        return this[_getPropertyModel_1]("email", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotEmpty_1(), new Email_1()], meta: { javaType: "java.lang.String" } }));
    }
}
export default ContactModel;
