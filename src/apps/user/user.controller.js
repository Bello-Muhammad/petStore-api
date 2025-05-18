const { Success, Failed, serverError } = require("../../handler/api.handler");
const { createAccount, getAccounts, getAccount, updateAccount, deleteAccount, loginUser } = require("./user.service");

class UserController {
    static async loginUser (req, res) {
        try{
            const data = await loginUser(req.body);

            // Success (res, 201, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async createAccount (req, res) {
        try{
            const data = await createAccount(req.body);

            Success (res, 201, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async getAccounts (req, res) {
        try{
            const data = await getAccounts();

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async getAccount (req, res) {
        try{
            const id = req.params.id;
            const data = await getAccount(id);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async updateAccount (req, res) {
        try{
            const id = req.params.id;
            const data = await updateAccount(id, req.body);

            Success (res, 201, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }

    static async deleteAccount (req, res) {
        try{
            const id = req.params.id;
            const data = await deleteAccount(id);

            Success (res, 200, data.message, data.data );
        } catch (error) {
            if (error instanceof Error) {
                Failed (res, 400, error.message)
            } else {
                serverError(res, 500, error.message)
            }
        }
    }
}

module.exports = UserController;