
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
        console.log(req.body)
        const summary = req.body.summary
        const title = req.body.title
        const { rows } = await pool.query(`INSERT INTO faq(title, summary) VALUES('${title}', '${summary}')`)
        res.send("submitted your request")
    } catch (err) {
        console.log(err)
    }
});


faq.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
      
        const { rows } = await pool.query(`DELETE FROM faq WHERE id=${id}`)
        res.send("deleted")
    } catch (err) {
        console.log(err)
    }
});

faq.patch("/", async (req, res) => {
     try {
         const {id, summary, title} =  req.body
      
        const { rows } = await pool.query(`UPDATE faq SET summary=$1,title=$2 WHERE id=$3`, [summary,title,id])
        res.send("updated")
    } catch (err) {
        console.log(err)
    }
})





module.exports = faq