import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const userBodySchema = joi.object({
  username: joi.string().min(3).required(),
  password: passwordComplexity({ min: 8, max: 256, numeric: 1, upperCase: 1, lowerCase: 1 })
});

export { userBodySchema };
