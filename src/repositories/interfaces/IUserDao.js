'use strict';

 class IUserRepository{
    constructor() { }

    save(entity) {
        // To be overridden in concrete implementation
    }

    remove(id) {
        // To be overridden in concrete implementation
    }

    async get(id) {
        // To be overridden in concrete implementation
    }

    async all() {
        // To be overridden in concrete implementation
    }
}

module.exports = IUserRepository;