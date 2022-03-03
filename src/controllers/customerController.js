import { connection } from "../db.js"
export async function getCustomers(req,res){
    const filter=req.query.cpf;
    const id  = req.params.id

    

    try{
        const findId = id&&(await connection.query(`SELECT * FROM customers WHERE  id=${id}`));
        const findCPF = filter&&(await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${filter}%'`));
        const findAll = await connection.query(`SELECT * FROM customers`)
        
       
        if(findId){
            if(findId.rowCount==0) return res.status(404).send({message:"ID Não encontrado"})
            return res.send(findId.rows[0])
        }
        if(findCPF){
            if(findCPF.rowCount==0) return res.status(404).send({message:"CPF Não encontrado"})
            return res.send(findCPF.rows)
        }
        if(filter==undefined&&id==undefined){
            return res.send(findAll.rows)
        }
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