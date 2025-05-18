const express = require('express');
const UserRouter = require('./apps/user/user.router');
const PetRouter = require('./apps/pet/pet.router');
const TransactionRouter = require('./apps/transactionHistory/transaction.router.');
const { isAuth } = require('./middlewares/auth.middleware');

const AppRouter = express.Router();

AppRouter.use('/users', UserRouter);
AppRouter.use('/pets', isAuth, PetRouter);
AppRouter.use('/transactions', TransactionRouter)

module.exports = {
    AppRouter
};