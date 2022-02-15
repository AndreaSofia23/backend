const Joi = require ('joi');

const userSchema = Joi.object({
  firstName:Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phone: Joi.number().min(10).max(11).required()
});

module.exports = userSchema;