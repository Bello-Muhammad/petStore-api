const { allTransaction, getTransaction } = require("./transaction.service");

class TransactionController {
    static async allTransaction (req, res) {
        try{

            const data = await allTransaction(req.user);

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

    static async getTransaction (req, res) {
        try{

            const data = await getTransaction(req.params.id);

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

module.exports = TransactionController;