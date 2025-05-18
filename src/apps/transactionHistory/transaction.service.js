const { Transaction } = require("../../config/firebaseDb.config");

class TransactionService {
    static async allTransaction (user) {
        const allTrans = await Transaction.where('owner', '==', user.id).get()

        if (allTrans.empty) {
            return { message: 'no transaction made yet', data: []}
        }

        return { message: 'all user transaction', data: allTrans.docs.data()}
    }

    static async getTransaction (id) {
        const data = await Transaction.doc(id).get();

        if (!data.exists) {
            throw new Error('pet not found')
        }

        const TData = { id: data.id, ...data.data() };
        return { message: 'transaction fetched successfully', data: TData };
    }
}

module.exports = TransactionService;