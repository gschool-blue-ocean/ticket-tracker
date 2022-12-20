
    const express = require('express');
    const app = express();
    //look this up
    const server = require('http').Server(app)
    //look this up
        app.use(express.json());
        const{Pool} = require('pg');

        const pool = new Pool({
            user:'postgres',
            password:'docker',
            host: 'localhost',
            port: 5432,
            database: 'testdb'
        });


        app.get('/accounts', (req, res) => {
            pool.query('SELECT * FROM accounts').then((result) => {
            // console.log(typeof(result.rows));
            // res.statusCode(200)
            // console.log(res.type)
            res.send(result.rows);
            })
        })

        app.get('/campus', (req, res) => {
            pool.query('SELECT * FROM campus').then( (campResults) =>{
                res.send(campResults.rows);
            })
        })

        app.listen(3001, () =>{
        //    console.log('Listening on port 3001 ');
        });

module.exports = server



 