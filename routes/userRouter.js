const express = require ('express');
const jwt = require('jsonwebtoken');
const usersController = require ('../controllers/usersController');
const userSchema = require ('../validationsSchemas/userValidations');
const userValidator = require('express-joi-validation').createValidator();


const routes = (User) => {
  const userRouter = express.Router();

  const{ getUsers,postUsers,getUserById,putUsers,deleteUserById, login } = usersController(User,jwt);
  
  userRouter.route('/users')
  .get( getUsers)
  .post(userValidator.body(userSchema),postUsers);

  userRouter.route('/users/:userId')
      .get( getUserById)
      .put(putUsers)
      .delete(deleteUserById)

  userRouter.route('/users/login')
      .post(login)

  

  return userRouter;
}

module.exports = routes; 