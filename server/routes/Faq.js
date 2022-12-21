
const express = require("express")
const faq = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../localPool");
faq.use(express())

faq.get('/', async (req, res) => {
    try {
        console.log('im working!')
        const { rows } =  await pool.query('SELECT * FROM faq')
        res.send(rows) 
    } catch (err) {
        console.log(err)
    }
});

faq.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        // const summary = ' '
        // const title = ' '
        const { rows } = await pool.query(`INSERT INTO faq (title, summary) VALUES(' ', ' ') returning *;`)
        res.send(rows)
    } catch (err) {
        console.log(err)
    }
});


faq.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const { rows } = await pool.query(`DELETE FROM faq WHERE id=${id}`)
        res.send("deleted")
    } catch (err) {
        console.log(err)
    }
});

faq.patch("/", async (req, res) => {
     try {
         const {id, column, value} =  req.body
        // console.log(req.body, dataType)
        const { rows } = await pool.query(`UPDATE faq SET ${column}='${value}' WHERE id=${id} returning *;`)
    res.status(200).send(rows)
    } catch (err) {
        console.log(err)
    }
})





module.exports = faq