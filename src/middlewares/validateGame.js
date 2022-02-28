import gameSchema from '../schemas/gameSchema.js';
import sanitizeData from '../utils/sanitizer.js';


export function validateGame(req,res,next){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;
    try{
        const gameSanitizer = {
            name : sanitizeData(name),
            image : sanitizeData(image),
            stockTotal : parseInt(sanitizeData(stockTotal)),
            categoryId : parseInt(sanitizeData(categoryId.toString())),
            pricePerDay : parseInt(sanitizeData(pricePerDay))
        }
        const validation =gameSchema.validate(gameSanitizer);
        if (validation.error) {
            console.log(validation.error)
          return res.sendStatus(400);
        }
        res.locals = gameSanitizer
        next()

    }catch(e){
        console.log(e)
        res.send({message:"Erro Interno"}
        )}
}