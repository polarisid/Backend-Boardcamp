import { connection } from "../db.js"
export async function getCustomers(req,res){
    const filter=req.query.cpf;
    const id  = req.params.id
    try{
        const query = filter?
            await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${filter}%'`)
            :
            req.params.id?
                await connection.query(`SELECT * FROM customers WHERE  id=${id}`)
                :
                await connection.query(`SELECT * FROM customers`)
        query.rows.length>0?
            res.send(query.rows)
            :
            res.status(404).send({message:"Não encontrado"})
    }
    catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})
    }
}

export async function postCustomers(req,res){
    
    try{

    }
    catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})  
    }
    
}