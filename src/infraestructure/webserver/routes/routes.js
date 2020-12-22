'use strict';

const JWT = require('jsonwebtoken');
const UserController = require('../../../controllers/UserController');
const usersController = new UserController();

module.exports = [
  {
    method: 'GET',
    path: '/api/token',
    config: {
      auth: false
    },
    handler: async (request, h) => {
      const people = {
        1: {
          id: 1,
          name: 'Play'
        }
      };
      const token = JWT.sign(people[1], 'NeverShareYourSecret');
      return h.response({
        token: token
      }).code(200).type('application/json');
    }
  },
  {
    method: "GET",
    path: "/",
    config: { auth: false },
    handler: async (request, h) => {
      return { text: 'Token not required' };
    }
  },
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
  }
];