const bcrypt = require('bcryptjs');
const { User } = require("../../config/firebaseDb.config");
const { generateToken, checkCredentials } = require('../../utils/helpers');

class UserService {
    static async loginUser (body) {
        const { email, password } = body;
        const data = await checkCredentials(email, password);

        // const token = await generateToken(data.email);

        // return { data, token}

    }

    static async createAccount (body) {
        const { firstName, lastName, email, password} = body;
        let newEmail = email.toLowerCase();
        const data = await User.where('email', '==', newEmail).get();
        if (!data.empty) {
            throw new Error ('email already exists')
        }

        let hashPassword = await bcrypt.hash(password, 8)

        await User.add({ firstName, lastName, email: newEmail, password: hashPassword})
        const token = await generateToken(newEmail);
        return  { message: `account created successfully`, data: {newEmail, token}}
    }

    static async getAccounts () {
        const users = await User.get();

        if (users.empty) {
            return { message: 'no users found', data: []}
        }

        const userData = users.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        return { message: 'users fetched successfully', data: userData };
    }

    static async getAccount (id) {
        const data = await User.doc(id).get();

        if (!data.exists) {
            throw new Error('user not found')
        }

        const userData = { id: data.id, ...data.data() };
        return { message: 'user fetched successfully', data: userData };
    }

    static async updateAccount (id, body) {
        const { firstName, lastName, email } = body;
        const data = await User.doc(id).get();
        if (!data.exists) {
            throw new Error('user not found')
        }

        await User.doc(id).update({
            firstName: firstName || data.firstName,
            lastName: lastName || data.lastName,
            email: email.toLowerCase() || data.email
        });

        return { message: 'user updated successfully', data: {}}
    }

    static async deleteAccount (id) {

        const data = await User.doc(id).get();
        if (!data.exists) {
            throw new Error('user not found')
        }

        await User.doc(id).delete();

        return { message: 'deleted successfully', data: {}}
    }
}

module.exports = UserService;