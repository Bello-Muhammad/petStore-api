const Joi = require('joi');
const { Failed } = require('../handler/api.handler');

class DataValidation {
    static async addPetValidation (req, res, next) {
        const schema = Joi.object().keys({
            petName: Joi.string().min(2).max(30).required(),
            price: Joi.string().required(),
            category: Joi.string().required()
        });
    
        const { error } = schema.validate(req.body, { abortEarly: false});

        if (error) {
            Failed(res, 400, error.details)
        }

        next();
    }

    static async createUserValidation (req, res, next) {
        const schema = Joi.object().keys({
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().valid('admin', 'user').required()
        });
    
        const { error } = schema.validate(req.body, { abortEarly: false});

        if (error) {
            Failed(res, 400, error.details)
        }

        next();
    }
}

module.exports = DataValidation