'use strict';

class UserFirebaseEntity{
    constructor(id = null, documentnumber, documenttype, firstname, lastname, email, age, score) {
        this.id = id;
        this.documentnumber = documentnumber;
        this.documenttype = documenttype;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.score = score;
    }
}

module.exports = UserFirebaseEntity;