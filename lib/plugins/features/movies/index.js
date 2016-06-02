'use strict';

const Controller            = require('./controller');
const MovieCreateValidator  = require('../../../validators/movie-create');
const MovieListValidator = require('../../../validators/movie-list');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.list(request.query));
      },
      validate: {
        query: MovieListValidator
      }
    }
  },
  {
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieCreateValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
