'use strict';

const GenerateUUID = require('./GenerateUUID');

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.generateUUID = new GenerateUUID();
    }

    setUser(user) {
        this.user = user;
    }

    setUserId() {
        this.generateUUID.setBytes(16);
        this.user.id = this.user.id == null ? this.generateUUID.execute() : this.user.id;
    }
    
    setUserCode() {
        this.generateUUID.setBytes(8);
        this.user.code = this.user.code == null ? this.generateUUID.execute() : this.user.code;
    }

    saveUser() {
        return this.userRepository.save(this.user);
    }

    execute() {
        this.setUserId();
        this.setUserCode();
        var saveUser = this.saveUser();

        return saveUser;
    }
}

module.exports = CreateUser;