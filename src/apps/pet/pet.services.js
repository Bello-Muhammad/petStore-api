const { Pet, Transaction } = require("../../config/firebaseDb.config");
const { initializePayment, verifyPayment } = require('./util/paymentUtil');

class PetService {
    static async addPet (body, user) {
        const { petName, category, price } = body;

        await Pet.add({ petName, category, price, owner: user.id });

        return { mesage: 'pet added successfully', data: { petName, category, price }}
    }

    static async getPets () {
        const pets = await Pet.get();

        if (pets.empty) {
            return { message: 'no pet available', data: []}
        }

        const petData = pets.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return { message: 'pets fetched successfully', data: petData };
    }

    static async getPet (id) {
        const data = await Pet.doc(id).get();

        if (!data.exists) {
            throw new Error('pet not found')
        }

        const petData = { id: data.id, ...data.data() };
        return { message: 'pet fetched successfully', data: petData };
    }

    static async updatePet (id, body) {
        const { petName, category, price } = body
        const data = await Pet.doc(id).get();

        if (!data.exists) {
            throw new Error('pet not found')
        }


        await Pet.doc(id).update({
            petName: petName || data.petName,
            category: category || data.category,
            price: price || data.price
        });

        return { message: 'pet update successfully', data: {}}
    }

    static async deletePet (id) {
        const data = await Pet.doc(id).get();

        if (!data.exists) {
            throw new Error('pet not found')
        }

        await Pet.doc(id).delete();

        return { message: 'pet delete successfully', data: [] }
    }

    static async petPayment (id, email, amount, user) {
        
        const payment = await initializePayment(email, amount);
        console.log(payment.data)
        await Pet.doc(id).update({ status: 'pending'});
        await Transaction.add({reference: payment.data.reference, amount, owner: user.id, status: 'pending'})
        return {message: 'payment initialize successfully', data: payment.data};
    }

    static async verifyPetPayment (id, reference) {
        const payment = await verifyPayment(reference);
        // console.log(payment.data) 

        if (payment.data.status === 'success') {
            await Pet.doc(id).update({ status: 'sold'})
            await Transaction.where('reference', '==', reference).update({ status: 'paid'});
        }
        
        return {message: 'payment successfully', data: payment.data}
    }
}

module.exports = PetService;