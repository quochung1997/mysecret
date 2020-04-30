const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports.verifyMiddleWare = function(req, res, next) {
    try {
        const {_id} = jwt.verify(req.header('auth-token'), SECRET_KEY);
        if (_id) {
            req._id = _id;
            next();
        } else {
            return res.status(400).send("Failed to verify token");
        }
    } catch (err) {
        return res.status(400).send("Failed to verify token");
    }
}

module.exports.getToken = _id => {
    return jwt.sign({_id}, SECRET_KEY);
}
