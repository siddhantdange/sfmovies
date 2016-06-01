'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('list', () => {

    const movie = { title: 'foo', release_year: 2016 };

    beforeEach(() => {
      return Knex('movies').insert(movie);
    });

    it('lists all movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        payload: {}
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.length).to.be.above(0);
        expect(response.result[0].title).to.be.equal(movie.title);
        expect(response.result[0].release_year).to.be.equal(movie.release_year);
      });
    });

  });

});
