import rentalSchema from '../schemas/rentalSchema.js';
import sanitizeData from '../utils/sanitizer.js';

export function validateRental(req,res,next){
    const {customerId,gameId,daysRented} = req.body;
    try{
        const rentalSanitizer = {
            customerId : parseInt(sanitizeData(customerId.toString())),
            gameId : parseInt(sanitizeData(gameId.toString())),
            daysRented : parseInt(sanitizeData(daysRented.toString())),
        }
        const validation =rentalSchema.validate(rentalSanitizer);
        if (validation.error) {
            console.log(validation.error)
          return res.sendStatus(400);
        }
        res.locals = rentalSanitizer
        next()
    }catch(e){
        console.log(e)
        return res.sendStatus(400)
    }
}

