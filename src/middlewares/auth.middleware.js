const jwt = require('jsonwebtoken');
const { User } = require('../config/firebaseDb.config');

const isAuth = async (req, res, next) => {
    try {
        if(!req.headers.authorization) throw new Error('user not login');

        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const email = decoded.email;

        const user = User.where('email', '==', email).get();

        if (user.empty) {
            throw new Error('access deny, acount not found')
        }

        const id = user.docs[0].id;
        const newUser = user.docs[0].data()

        req.user = { id, ...newUser};

        next()
    } catch (error) {
        
        if (error instanceof Error) {
            ResponseHandler.error(res, 400, error.message);
        }else{
            ResponseHandler.error(res, 500, 'internal error')
        }
    }
}

const authPage = (permissions) => {
    return (req, next) => {
        const role = req.user.role;
        if(permissions.includes(role)) {
            next();
        }else{
            throw new Error('you not authorized to use this endpoint')
        }
    }
};

module.exports = {
    isAuth,
    authPage
}