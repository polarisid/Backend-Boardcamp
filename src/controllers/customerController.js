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

        query.rows.length===1&id&&
            res.send(query.rows[0]);

        query.rows.length>1?
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
    const {name,phone,cpf,birthday}=res.locals
    try{
        const findCPF = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}'`)
        if(findCPF.rowCount>0){
           return res.status(409).send({message:"CPF já cadastrado"})
        }
        await connection.query(`
            INSERT INTO 
                customers (name,phone,cpf,birthday) 
                VALUES ($1,$2,$3,$4)`,
            [name,phone,cpf,birthday])
        return res.sendStatus(201)
    }
    catch(e){
        console.log(e);
        res.status(501).send({message:"Erro interno"})  
    }
    
}

export async function putCustomers(req,res){
    const id  = parseInt(req.params.id)
    const {name,phone,cpf,birthday}=res.locals
try{
    const findCPF = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}'`)
    if(findCPF.rowCount>0&&findCPF.rows[0].id!==id){
       return res.status(409).send({message:"Você não pode alterar para um CPF já cadastrado"})
    }
    await connection.query(`
        UPDATE customers SET 
            name=$1, 
            phone=$2, 
            cpf=$3,
            birthday=$4
        WHERE id=$5`,[name,phone,cpf,birthday,id])
    return res.sendStatus(200)
}catch(e){
    console.log(e);
    res.status(501).send({message:"Erro interno"})  
}
}