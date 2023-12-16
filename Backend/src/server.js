import express, {response} from 'express';
import 'dotenv/config';
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import {MongoClient} from "mongodb";


const app = express()
app.use(express.json())
const port = 3001

app.get('/api/images', async (req,res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()
    const db = client.db('asd-data')
    const images = await db.collection('images').find({}).toArray()
    res.json(images)
})

app.post("/api/saveimage/", async (req,res,response) =>{
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect()
    const db = client.db('asd-data')
    let imagelink = req.body.link
    res.send(imagelink)
    await db.collection("images").insertOne({imagelink})

})

app.listen(port, () =>{
    console.log('Server is listening')
})
