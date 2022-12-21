//////mock server setup
const server = require('./mockServer.js');
const supertest = require('supertest') // Import supertest
const requestWithSupertest = supertest(server) // We will use this function to mock HTTP requests

///live server setup/////
const liveServer = require('./server.js');
const liveSupertest = require('supertest');
const liveRequest = liveSupertest(liveServer);


afterEach(done => { // afterEach function is provided by Jest and executes once all tests are finished
    server.close() // We close the server connection once all tests have finished
    done()
})

////////// LIVE UNIT TEST///////////////////////
// describe("Running server tests on live accounts table in Athenadb ",  () => {
//     test('GET "/Accounts" returns status of 200', async () => {
//         const res = await liveRequest.get('/Accounts')
//         expect(res.status).toEqual(200)
//     })

// })

/////////////UNIT TESTS////////////////////
jest.setTimeout(20000)
describe("Running server tests on accounts table in testdb ",  () => {
    test('GET "/accounts" returns status of 200', async () => {
        const res = await requestWithSupertest.get('/accounts')
        expect(res.status).toEqual(200)
    })
    test('GET "/accounts" returns a data type of json', async () => {
        const res = await requestWithSupertest.get('/accounts')
        expect(res.type).toEqual(expect.stringContaining('json'))
    })
    test('GET "/accounts" returns the accessrole object from accounts', async () => {
        const res = await requestWithSupertest.get('/accounts')
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({accessrole: "admin"})]))
    })
})
describe("Running server tests on campus table in testdb", () => {
    test('Get "/campus" returns status of 200', async () => {
        const res = await requestWithSupertest.get('/campus')
        expect(res.status).toEqual(200);
    })
    test('GET "/campus" returns a data type of json', async () => {
        const res = await requestWithSupertest.get('/campus')
        expect(res.type).toEqual(expect.stringContaining('json'))
    })
    test('GET "/campus" returns the campus_id object from campus', async () => {
        const res = await requestWithSupertest.get('/campus')
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({campus_id: 1 })]))
    })
})


//create test that validates logout
//create a test that validates login success
//validate create account success
//validate login success
//expect(isloggedin toEqual true) in App.js
//obstacles: spoof or clone the login database
//test every component for text
//use mock server to test changes made to routes, 
    