'use strict';

class User {
    constructor(id = null, documentnumber, documenttype, firstname, lastname, email) {
        this.id = id;
        this.documentnumber = documentnumber;
        this.documenttype = documenttype;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}
module.exports = User;