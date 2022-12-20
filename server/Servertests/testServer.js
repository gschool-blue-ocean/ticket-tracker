const express = require("express");
const cors = require("cors");
// require('dotenv').config({ path: '../.env'});
const app = express();


 //create a test that connects to the server and peforms a GET request and return data from a table
 


const port = process.env.PORT || 3000

// const testUserRoute = require("./testroutes/testUser")
const testAdminRoute = require("./testroutes/testAdmin")
// const testTechRoute = require("./testroutes/testTech")
// const authRoute = require('./AuthRoute/register_login');

const testAuthorizeToken = require("./testroutes/testAuthToken");

app.use(cors());
app.use(express.json());

//testing s3 url route
app.get('/s3Url', async (req, res)=>{
  const url = await generateUploadURL()
  res.send({url})
})

//routes import
app.use("/admin", testAdminRoute);
// app.use("/tech", testTechRoute);
// app.use("/user", testUserRoute)
// app.use("/account", authRoute);
app.post('/test', testAuthorizeToken);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});