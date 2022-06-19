import Joi from 'joi';

const pattern = /^[a-zA-Z0-9]{3,30}$/;
const username = /^(?=.{3,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(pattern).required()
});
const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().pattern(username).required(),
    password: Joi.string().pattern(pattern).required(),
    imageUrl: Joi.string().uri().required()
});

export { signInSchema, signUpSchema };