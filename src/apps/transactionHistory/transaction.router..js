const express = require('express');
const { allTransaction, getTransaction } = require('./transaction.controller');

const TransactionRouter = express.Router();

TransactionRouter.get('/', allTransaction);
TransactionRouter.get('/:id', getTransaction)

module.exports = TransactionRouter;