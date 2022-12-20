const jwt = require('jsonwebtoken');
require('dotenv').config()

const testAuthorizeToken = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.test.env.ACCESS_TOKEN, (error, user) => {
        if (error) return res.sendStatus(403)
        res.send(user)
    });
}

module.exports = testAuthorizeToken;