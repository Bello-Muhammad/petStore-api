const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { User } = require('../config/firebaseDb.config');

const generateToken = async (email) => {
    return await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE })
}

const checkCredentials = async ( email, password ) => {
    const user = await User.where('email', '==', email.toLowerCase()).get()

    if (user.empty) {
        throw new Error ('invalid email')
    }

    const newUser = user.docs[0].data()
    const isMatch = await bcrypt.compare(password, newUser.password)
    
    if(!isMatch) {
        throw new Error("invalid password")
    }

    const id = user.docs[0].id;
    
    return { id, ...newUser}
}

module.exports = {
    generateToken,
    checkCredentials
}