import dotenv from "dotenv/config";
import express from 'express';

const app = express(); //we import express as a function
const port = process.env.PORT || 4000;

app.use(express.json())
//Express server needs to receive and read JSON data sent in the request body (such as from POST, PUT, or PATCH requests).

let teadata = []
let nid = 1

//used when a client (like a browser or frontend app) wants to send new data to the server

//1.add a new tea //1.Create
app.post('/tea', (req, res) => {
    const { name, price } = req.body
    const newtea = {
        id: nid++,
        name,
        price
    }
    teadata.push(newtea);
    res.status(200).send(newtea)
})


//get all array of tea //2.Read
app.get("/tea", (req, res) => {
    res.status(200).send(teadata);
})

//get tea with id //2.Read with id
app.get('/tea/:id', (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(400).send("tea not found")
    }
    res.status(200).send(tea)
})

/*Request URL, Value captured in req.params.id
GET / teas / 12, """12"""
GET / teas / earl - grey, """earl-grey"""
GET / teas / green - tea - 99, """green-tea-99*/

/*
req.url is a raw string containing the exact relative path and query string sent by the client.

req.params is a parsed JavaScript object containing key-value pairs extracted from dynamic route segments (like :id). 
*/

/*
// Updated Route Definition
app.get('/teas/:id/:taste/:flavour', (req, res) => { ... });

req.url:    '/teas/matcha/sweet/mango'
req.params: { id: 'matcha', taste: 'sweet', flavour: 'mango' }
*/

//update with specific id
app.put("/tea/:id", (req, res) => {
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(400).send("tea not found")
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price

    res.status(200).send(tea)
})

//delete
app.delete("/tea/:id", (req, res) => {
    let ind = teadata.findIndex(t => t.id === parseInt(req.params.id))

    if (ind == -1) {
        return res.status(404).send("tea not found")
    }
    teadata.splice(ind, 1)
    res.status(200).send(teadata)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})