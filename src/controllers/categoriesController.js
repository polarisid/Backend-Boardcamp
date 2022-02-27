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
   return res.send(201)
}