import sanitizeData from '../utils/sanitizer.js';
import categoriesSchema from '../schemas/categoriesSchema.js';

export function validateCategories(req,res,next){
    const {name} = req.body
    const categoriesSanitizer = {
        name: sanitizeData(name)
    }
    const validation =categoriesSchema.validate(categoriesSanitizer);
    if (validation.error) {
        return res.sendStatus(400);
    }
    next()
}