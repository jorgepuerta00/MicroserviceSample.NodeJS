'use strict';

const CreateUser = require('../usescases/CreateUser');
const GetAllUsers = require('../usescases/GetAllUser');
const GetUserById = require('../usescases/GetUserById');
const User = require('../usescases/domain/User');

const UserRepository = require('../repositories/UserRepository');
const FirebaseDaoFactory = require('../repositories/daoFactory/FirebaseDaoFactory');
const UserFirebaseEntityMap = require('../repositories/mapEntities/UserFirebaseEntityMap');

class UserController {
    constructor() {
        this.userRepository = new UserRepository(new FirebaseDaoFactory(), new UserFirebaseEntityMap());
    }

    createUser(request, h) {
        const { id, documentnumber, documenttype, firstname, lastname, email } = request.payload;
        const useCase = new CreateUser(this.userRepository);
        const user = new User(id, documentnumber, documenttype, firstname, lastname, email)
        useCase.setUser(user);
        const response = h.response({ "data": useCase.execute() }).code(201).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }
    
    async getUser(request, h) {
        const idUser = request.params.id;
        const useCase = new GetUserById(this.userRepository);
        useCase.setIdUser(idUser);
        const response = h.response({ "data": await useCase.execute() }).code(200).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }

    async getAllUsers(request, h) {
        const useCase = new GetAllUsers(this.userRepository);
        const response = h.response({ "data": await useCase.execute() }).code(200).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }
}

module.exports = UserController;