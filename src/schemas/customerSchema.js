import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().min(2).required(),
    phone: joi.string().pattern(/^\d{10,11}$/).required(),
    cpf: joi.string().pattern(/^\d{11}$/).required(),
    birthday: joi.string().pattern(/^\d{4}(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/)
    // birthday: joi.string()
});
  
  export default customerSchema;