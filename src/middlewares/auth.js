const User = require('./../model/User');

const auth = async (req,res,next) => {
    let token =req.cookies.auth;
    try {
    const user = await User.findByToken(token);
    if(!user) return res.sendStatus(401);
    req.token= token;
    req.user=user;
    next();
    } catch (error) {
       throw error;
    }
};

module.exports= {auth};
