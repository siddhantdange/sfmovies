'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../lib/validators/movie-list');

describe('movie list validator', () => {

  describe('title', () => {

    it('is optional', () => {
      const payload = {
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error).to.be.null;
    });

    it('is not empty', () => {
      const payload = { title: '' };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        title: 'foo',
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year: 12345
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is optional', () => {
      const payload = {
      };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error).to.be.null;
    });

  });

});
