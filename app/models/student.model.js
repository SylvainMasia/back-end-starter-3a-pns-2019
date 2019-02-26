const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    filiere: Joi.string().required(),
  });