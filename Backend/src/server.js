import express from 'express';
import 'dotenv/config';
import req from "express/lib/request.js";
import res from "express/lib/response.js";


const app = express()
const port = 3000

app.get("/hello", (req, res) => {
    res.send('hello')
})

app.listen(port, () =>{
    console.log('Server is listening')
})