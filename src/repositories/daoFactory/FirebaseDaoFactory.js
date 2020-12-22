'use strict';

const UserFirebaseDao = require('../firebasePersistence/UserFirebaseDao');

class FirebaseDaoFactory {

    getUserDao() {
        return UserFirebaseDao;
    }
}

module.exports =  FirebaseDaoFactory;