'use strict';

const IUserRepository = require('../usescases/repository/IUserRepository');

class UserRepository extends IUserRepository {

    constructor(userDaoFactory, userEntityMap) {
        super();
        this.userDaoFactory = userDaoFactory;
        this.userEntityMap = userEntityMap;
    }

    save(user) {
        const entity = this.userEntityMap.serializeToEntity(user);
        const source = this.userDaoFactory.getUserDao();   
        return source.save(entity);
    }

    remove(idUser) {
     
    }

    async get(idUser) {
        const source = this.userDaoFactory.getUserDao();   
        return  this.userEntityMap.serializeToUser(await source.get(idUser));
    }

    async all() {
        const source = this.userDaoFactory.getUserDao();   
        return  this.userEntityMap.serializeToUser(await source.all());
    }
}

module.exports = UserRepository;