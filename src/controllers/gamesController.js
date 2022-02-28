import { connection } from "../db.js";
export async function getGames(req,res){
    try{
        const query = await connection.query(`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId"=categories.id`);
        res.send(query.rows)
    }catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})
    }
}

export async function postGames(req,res){
    const {name, image, stockTotal,categoryId,pricePerDay} = res.locals
    try{
        const findGame = await connection.query(`SELECT * FROM games WHERE name='${name}'`)
        if(findGame.rows.length>0){
            return res.status(409).send({message:"Game já cadastrado"})
        }
        await connection.query(`
        INSERT INTO
            games (name,image,"stockTotal","categoryId","pricePerDay")
            VALUES ($1,$2,$3,$4,$5)`,
            [name,image,stockTotal,categoryId,pricePerDay])
        res.sendStatus(201)

    }catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})  
    }

}