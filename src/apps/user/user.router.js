const express = require('express');
const { createAccount, getAccounts, getAccount, updateAccount, deleteAccount, loginUser } = require('./user.controller');
const { createUserValidation } = require('../../middlewares/validation.middleware');
const { isAuth, authPage } = require('../../middlewares/auth.middleware');

const UserRouter = express.Router();

UserRouter.post('/register-account', createUserValidation, createAccount)
UserRouter.post('/auth/login', loginUser)
UserRouter.get('/profiles', isAuth, authPage(['admin']), getAccounts)
UserRouter.get('/profile/:id', isAuth, getAccount)
UserRouter.patch('/account/update/:id', isAuth, updateAccount)
UserRouter.delete('/account/delete/:id', isAuth, authPage(['admin']), deleteAccount)

module.exports = UserRouter;