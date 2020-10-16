const User = require('./../model/User');

const isLogged = async (req, res, next) => {
    let token = req.cookies.auth;
    try {
        const user = await User.findByToken(token);
        if (!user) return res.sendStatus(401);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        throw error;
    }
};

const isNotLogged = async (req, res, next) => {
    let token = req.cookies.auth;
    try {
        const isLogged = await User.findByToken(token);
        if (isLogged) return res.sendStatus(401);
        const user = await User.findOne({ email: req.body.email });
        req.user = user;
        next();
    } catch (error) {
        throw error;
    }
};

module.exports = { isLogged, isNotLogged };
