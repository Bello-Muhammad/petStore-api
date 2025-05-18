const express = require('express');
const { addPet, getPets, getPet, updatePet, deletePet, petPayment, verifyPetPayment } = require('./pet.controllers');
const { addPetValidation } = require('../../middlewares/validation.middleware');

const PetRouter = express.Router();

PetRouter.post('/add-pet',  addPetValidation, addPet);
PetRouter.get('/', getPets);
PetRouter.get('/:id', getPet);
PetRouter.patch('/:id', updatePet);
PetRouter.delete('/delete/:id', deletePet);

PetRouter.post('/buy/pet', petPayment);
PetRouter.post('/verify/payment', verifyPetPayment);

module.exports = PetRouter;