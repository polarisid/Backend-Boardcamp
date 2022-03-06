import { connection } from "../db.js";
export async function getGames(req,res){
    const filter=req.query.name;
    try{
        if(filter){
        const query = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games  JOIN categories ON games."categoryId"=categories.id  WHERE UPPER(games.name) LIKE UPPER('${filter}%')` );
        return res.send(query.rows)
        }
        const query = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`);
        return res.send(query.rows)
    }catch(e){
        console.log(e);
        return res.status(501).send({message:"Erro interno"})
    }
}

export async function postGames(req,res){
    const {name, image, stockTotal,categoryId,pricePerDay} = res.locals
    try{
        const findGame = await connection.query(`SELECT * FROM games WHERE name='${name}'`)
        const findCategoryId = await connection.query(`SELECT * FROM categories WHERE id='${categoryId}'`)
        if(findGame.rowCount>0){
            return res.status(409).send({message:"Game já cadastrado"})
        }
        if(findCategoryId.rowCount==0){
            return res.status(400).send({message:"ID da categoria inexistente"})
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