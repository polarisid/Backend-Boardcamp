import { connection } from "../db.js";
import dayjs from 'dayjs';
import duration from '../../node_modules/dayjs/plugin/duration.js'
dayjs.extend(duration)
export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals
    const rentDate = dayjs().format('YYYY-MM-DD')
    console.log(rentDate)
    try {
        const findGame = await connection.query(`SELECT * FROM games WHERE id='${gameId}'`)
        const findCustomer = await connection.query(`SELECT * FROM customers WHERE id='${customerId}'`)
        if (findCustomer.rowCount == 0 || findGame.rowCount == 0) {
            return res.status(400).send({ message: "Consumidor ou Jogo não encontrado" })
        }
        const onStockgame = (await connection.query(`SELECT "stockTotal" FROM games WHERE id=${gameId}`)).rows[0].stockTotal
        const totalRentalsGame = (await connection.query(`SELECT * FROM rentals WHERE "gameId"=${gameId} AND "returnDate" IS NULL`)).rowCount
        if (onStockgame <= totalRentalsGame) {
            return res.status(400).send({ message: "Jogo Indisponível para aluguel" })
        }
        const pricePerDay = (await connection.query(`SELECT "pricePerDay" FROM games WHERE id=${gameId}`)).rows[0].pricePerDay
        const originalPrice = daysRented * pricePerDay
        const returnDate = null;
        const delayFee = null;
        await connection.query(`
        INSERT INTO 
            rentals ("customerId", "gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
            VALUES ($1,$2,$3,$4,$5,$6,$7)
        `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        console.log(originalPrice)
        res.status(201).send({ message: res.locals })
    } catch (e) {
        console.log(e);
        res.status(501).send({ message: "Erro interno" })
    }
}
export async function getRental(req, res) {
    const filterCustomer = req.query.customerId;
    const filterGame = req.query.gameId
    try {

        if (!filterCustomer && !filterGame) {
            const rentals = (await connection.query(`SELECT * FROM rentals`)).rows
            const customers = (await connection.query(`SELECT customers.id ,customers.name FROM customers`)).rows
            const games = (await connection.query(`SELECT games.id, games.name,games."categoryId", categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`)).rows
            const summaryRental = rentals.map(rental => ({
                ...rental,
                customer: customers.find(customer => customer.id === rental.customerId),
                game: games.find(game => game.id === rental.gameId),
            }));

            return res.send(summaryRental)
        }

        const findGame = filterGame && (await connection.query(`SELECT * FROM games WHERE id='${filterGame}'`)).rowCount
        const findCustomer = filterCustomer && (await connection.query(`SELECT * FROM customers WHERE id='${filterCustomer}'`)).rowCount
        console.log(findCustomer)
        if (findCustomer) {
            const rentals = (await connection.query(`SELECT * FROM rentals WHERE "customerId"=${filterCustomer}`)).rows
            const customers = (await connection.query(`SELECT customers.id ,customers.name FROM customers`)).rows
            const games = (await connection.query(`SELECT games.id, games.name,games."categoryId", categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`)).rows
            const summaryRental = rentals.map(rental => ({
                ...rental,
                customer: customers.find(customer => customer.id === rental.customerId),
                game: games.find(game => game.id === rental.gameId),
            }));
            return res.send(summaryRental)
        }
        if (findGame) {
            const rentals = (await connection.query(`SELECT * FROM rentals WHERE "gameId"=${filterGame}`)).rows
            const customers = (await connection.query(`SELECT customers.id ,customers.name FROM customers`)).rows
            const games = (await connection.query(`SELECT games.id, games.name,games."categoryId", categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`)).rows
            const summaryRental = rentals.map(rental => ({
                ...rental,
                customer: customers.find(customer => customer.id === rental.customerId),
                game: games.find(game => game.id === rental.gameId),
            }));
            return res.send(summaryRental)
        }
        if (findCustomer == undefined || findGame == undefined) {
            return res.status(400).send({ message: "Game ID ou Customer ID não existe" })
        }
    } catch (e) {
        console.log(e);
        res.status(501).send({ message: "Erro interno" })
    }
}
export async function finishRental(req, res) {
    try {
        const rentalId = req.params.id;
        const returnDate = dayjs().format('YYYY-MM-DD')
        const rental = (await connection.query(`SELECT * FROM rentals WHERE rentals.id=($1)`, [rentalId]))
        if (rental.rowCount == 0) return res.status(404).send({ message: "Não encontardo aluguel para este id" })
        if (rental.rows[0].returnDate != null) return res.status(400).send({ message: "Aluguel já finalizado" })
        const rentDate = new Date(rental.rows[0].rentDate)
        const daysRented = rental.rows[0].daysRented
        const daysElapsed = dayjs.duration(dayjs(returnDate).diff(rentDate)).days()
        const delayFee = (parseInt(daysElapsed) - parseInt(daysRented))*(rental.rows[0].originalPrice)
        await connection.query(`UPDATE 
            rentals SET 
            "returnDate" = $1,
            "delayFee" = $2
        WHERE id=$3`, [returnDate, delayFee,rentalId])

        return res.sendStatus(200)
    }
    catch (e) {
        console.log(e);
        res.status(501).send({ message: "Erro interno" })
    }
}

export async function deleteRental(req, res){
    const rentalId = req.params.id;
    const rental = (await connection.query(`SELECT * FROM rentals WHERE rentals.id=($1)`, [rentalId]))
    if (rental.rowCount == 0) return res.status(404).send({ message: "Não encontardo aluguel para este id" })
    if (rental.rows[0].returnDate != null) return res.status(400).send({ message: "Aluguel já finalizado" })
    await connection.query(`DELETE FROM rentals WHERE rentals.id=($1)`, [rentalId])
    return res.sendStatus(200)
}