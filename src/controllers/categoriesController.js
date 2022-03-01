import {connection} from   '../db.js';

export async function getCategories(req,res){
    try{
        const query = await connection.query(`SELECT * FROM categories`);
        res.send(query.rows)
    }catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})
    }
}


export async function postCategories(req,res){
    const {name} = res.locals;
    try{
        const findCategory = await connection.query(`SELECT * FROM categories WHERE name='${name}'`)
        if(findCategory.rowCount>0){
            return res.status(409).send({message:"Categoria já cadastrada"})
        }
        await connection.query(`
            INSERT INTO 
                categories (name) 
                VALUES ($1)`,
            [name])
        return res.sendStatus(201)

    }catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})
    }

}