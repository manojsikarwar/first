const jwt = require('jsonwebtoken');

module.exports.userAuthenticator = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'User is not Authenticated'
        });
    } 
    if (req.user && (req.user.exp < (new Date().getTime() / 1000))) {
        return res.status(401).json({
            message: 'User Token Expire'
        });
    } else {
        next()
    }
};