const joi = require('joi');

const registerValidation = ( req, res, next ) =>{
    const schema = joi.object({
        firstName : joi.string().min(3).max(30).required(),
        lastName : joi.string().min(3).max(30).required(),
        email : joi.string().email().required(),
        password : joi.string().min(6).max(20).required(),
        confirmPassword : joi.string().valid(joi.ref('password')).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({ message : "bad request", error});
    }
    next();
}

const loginValidation = ( req, res, next ) =>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(6).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({ message : "bad request", error});
                       

    }
     
    next();

}

module.exports = {
    registerValidation,
    loginValidation
}   