'use strict';

const admin = require('firebase-admin');

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

  async createUser(request, h) {
    const { documentnumber, documenttype, firstname, lastname, email, age, score, password } = request.payload;

    const useCase = new CreateUser(this.userRepository);

    await admin.auth().createUser({ email: email, password: password, displayName: `${firstname} ${lastname}` })
      .then(async function(user) {
        const objUser = new User(user.uid, documentnumber, documenttype, firstname, lastname, email, age, score)
        useCase.setUser(objUser);
      })

    const response = h.response({ "data": await useCase.execute() }).code(201).type('application/json');
    response.header("Authorization", request.headers.authorization);
    return response;
  }

  async verifyIdToken(request, h) {
    const idToken = request.params.id;

    const decodedToken = await admin.auth().verifyIdToken(idToken)
                            .then((decodedToken) => { return decodedToken; })
                            .catch((error) => { return error; })

    const response = h.response({ "data": decodedToken }).code(201).type('application/json');
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