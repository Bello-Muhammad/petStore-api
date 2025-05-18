const { Success, Failed, serverError } = require("../../handler/api.handler");
const { addPet, getPets, getPet, updatePet, deletePet, petPayment, verifyPetPayment } = require("./pet.services");

class PetController {
    static async addPet (req, res) {
        try{
            const data = await addPet(req.body, req.user);

            Success (res, 201, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async getPets (req, res) {
        try{
            const data = await getPets();

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async getPet (req, res) {
        try{
            const id = req.params.id;

            const data = await getPet(id);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async updatePet (req, res) {
        try{
            const id = req.params.id;

            const data = await updatePet(id, req.body);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async deletePet (req, res) {
        try{
            const id = req.params.id;

            const data = await deletePet(id);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async petPayment (req, res) {
        try{
            const { email, amount } = req.body;

            const data = await petPayment(req.params.id, email, amount, req.user);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async verifyPetPayment (req, res) {
        try{
            const { transactionRef } = req.body;

            const data = await verifyPetPayment(req.params.id, transactionRef);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                Failed (res, 400, error.message)
            } else {
                console.log(error)
                serverError(res, 500, error.message)
            }
        }
    }
}

module.exports = PetController;