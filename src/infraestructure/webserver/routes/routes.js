'use strict';

const JWT = require('jsonwebtoken');
const UserController = require('../../../controllers/UserController');
const usersController = new UserController();

module.exports = [
  {
    method: 'POST',
    path: '/api/users',
    config: { auth: 'jwt' },
    handler: async (request, h) => usersController.createUser(request, h)
  },
  {
    method: 'GET',
    path: '/api/users',
    config: { auth: 'jwt' },
    handler: async (request, h) => usersController.getAllUsers(request, h)
  },
  {
    method: 'GET',
    path: '/api/users/{id}',
    config: { auth: 'jwt' },
    handler: async (request, h) => usersController.getUser(request, h)
  },
  {
    method: 'GET',
    path: '/api/users/verifyIdToken/{id}',
    config: { auth: 'jwt' },
    handler: async (request, h) => usersController.verifyIdToken(request, h)
  }
];