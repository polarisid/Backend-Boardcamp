import customerSchema from "../schemas/customerSchema.js";
import sanitizeData from '../utils/sanitizer.js'
export function validateCustomer(req,res,next){
    const {name,phone,cpf,birthday} = req.body;
    try{
      const customerSanitizer = {
          name : sanitizeData(name),
          phone : sanitizeData(phone),
          cpf : sanitizeData(cpf),
          birthday : sanitizeData(birthday)
      }
      const validation =customerSchema.validate(customerSanitizer);
      if (validation.error) {
        return res.sendStatus(400);
      }
      res.locals = customerSanitizer
      next()
    }catch(e){
      return res.sendStatus(400)
    }

}