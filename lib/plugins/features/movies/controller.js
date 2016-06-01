'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.list = (query) => {
  return new Movie().query((qb) => {
    if (query.title) {
      qb.where('title', query.title);
    }

    if (query.release_year) {
      qb.where('release_year', query.release_year);
    }
  })
  .fetchAll();
};
