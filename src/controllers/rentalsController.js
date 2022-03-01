import { connection } from "../db.js";

export async function postRental(req,res){
    const {customerId,gameId,daysRented} = res.locals
    try{
        const findGame     = await connection.query(`SELECT * FROM games WHERE id='${gameId}'`)
        const findCustomer = await connection.query(`SELECT * FROM customers WHERE id='${customerId}'`)
        console.log(findCustomer.rowCount)
        if(findCustomer.rowCount==0||findGame.rowCount==0){
            return res.status(400).send({message:"Consumidor ou Jogo não encontrado"})
        }
        res.status(200).send({message:res.locals})
    }catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"}) 
    }
}