const express = require('express');
// const pool = require("../config");
const pool = require('../localPool.js')

const adminRoute = express.Router();

adminRoute.get("/Accounts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM accounts");
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});


adminRoute.get("/tickets", async (req, res) => {
  try {
    const { rows } = await pool.query(" SELECT tickets.ticket_id,  tickets.category, tickets.descrip, tickets.assigned, tickets.priority, tickets.status, tickets.eta, campus.name FROM tickets JOIN campus ON tickets.campus_id = campus.campus_id;");
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});



adminRoute.get("/Accounts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM accounts WHERE user_id = $1", [
      id
    ]);
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});

adminRoute.post("/Accounts/create", async (req, res) => {
  const { userName, acessRole, campus_id, email, profilePic, password } =
    req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO accounts (userName, acessRole, campus_id, email, profilePic, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;",
      [userName, acessRole, campus_id, email, profilePic, password]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});

adminRoute.patch("/Accounts/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body, id)
  try {
    const { userName, emailInfo, accessRole, campusName } = req.body;
    const { rows } = await pool.query(
      "UPDATE accounts SET userName = $1, email=$2, accessrole=$3, campus_name=$4 WHERE user_id = $5 RETURNING *;",
      [userName, emailInfo, accessRole, campusName, id]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});

adminRoute.delete("/Account/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "DELETE FROM accounts WHERE user_id = $1;",
      [id]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});




module.exports = adminRoute;