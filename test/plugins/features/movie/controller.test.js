'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E', release_year: 2016 };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('list', () => {

    const movie_one = { title: 'foo', release_year: 2016 };
    const movie_two = { title: 'bar', release_year: 2016 };
    const movie_three = { title: 'foo', release_year: 2015 };

    beforeEach(() => {
      return Knex('movies').insert([movie_one, movie_two, movie_three]);
    });

    it('lists all movies', () => {
      const query = {};

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.length(3);
      });
    });

    it('lists all movies from year', () => {
      const query = { release_year: movie_one.release_year };

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.length(2);
        expect(movies.models[0].get('release_year')).to.be.equal(movie_one.release_year);
      });
    });

    it('lists all movies from title', () => {
      const query = { title: movie_two.title };

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.length(1);
        expect(movies.models[0].get('title')).to.be.equal(movie_two.title);
      });
    });

  });

});
