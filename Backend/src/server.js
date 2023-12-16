import express, {response} from 'express';
import 'dotenv/config';
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import {MongoClient} from "mongodb";
import cors from 'cors';
import { configDotenv } from 'dotenv';

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001
const uri = process.env.Mongo_URI
app.get('/api/images', async (req,res) => {
    const client = new MongoClient('mongodb+srv://colonel2091:bRJgWJ4PadxthEen@cluster0.lp4frul.mongodb.net/')
    await client.connect()
    const db = client.db('ImageGenerator')
    const images = await db.collection('images').find({}).toArray()
    res.json(images)
})

app.post("/api/saveimage/", async (req,res,response) =>{
    const client = new MongoClient('mongodb+srv://colonel2091:bRJgWJ4PadxthEen@cluster0.lp4frul.mongodb.net/')
    await client.connect()
    const db = client.db('ImageGenerator')
    let imagelink = req.body.link
    res.send(imagelink)
    await db.collection('images').insertOne({imagelink})

})

app.listen(port, () =>{
    console.log('Server is listening')
})
