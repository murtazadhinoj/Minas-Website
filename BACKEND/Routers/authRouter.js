const { register, login } = require('../Controllers/authController');
const { registerValidation, loginValidation } = require('../Middlewares/validation');

const   router = require('express').Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);


module.exports = router;