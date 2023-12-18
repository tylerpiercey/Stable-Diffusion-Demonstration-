import express, {response} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import path from 'path';
import https from 'https';
import fs from 'fs';
import {MongoClient} from "mongodb";
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors())
app.use(express.json())
const port = 3001

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3001/api/google/oauth'
);

const getGoogleOauthUrl = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];
    const url = oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
    console.log("Generated OauthURL:", url);
    return url;
};
const getAccessAndBearerTokenUrl = ({ access_token }) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

const googleOauthURL = getGoogleOauthUrl();
app.get('/api/google/oauthURL', async (req, res) => {
    const googleOauthURL = getGoogleOauthUrl();
    res.status(200).json({"url": googleOauthURL});
});
// Google OAuth callback route
app.get('/api/google/oauth', async (req, res) => {
        const { code } = req.query;
        console.log("Authorization code:", code); 

        const { tokens } = await oauthClient.getToken(code);
        console.log("Tokens received:", tokens);
        
        const url = getAccessAndBearerTokenUrl( tokens );
        console.log(url);

        const myHeaders = new Headers();
        const bearerToken = "Bearer " +tokens.id_token;
        myHeaders.append("Authorization", bearerToken);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                jwt.sign({ "email": result.email, "name": result.name }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    res.redirect(`http://localhost:3001?token=${token}`)
                });
            })
            .catch(error => {
                console.log('error', error);
                res.status(500).json(error);
            });
        

        const accessToken = tokens.access_token;
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        const profile = await response.json();
});

app.get('/api/images', async (req,res) => {
    const client = new MongoClient(process.env.Mongo_URI)
    await client.connect()
    const db = client.db('ImageGenerator')
    const images = await db.collection('images').find({}).toArray()
    res.json(images)
})

app.post("/api/saveimage/", async (req,res,response) =>{
    const client = new MongoClient(process.env.Mongo_URI)
    await client.connect()
    const db = client.db('ImageGenerator')
    let imagelink = req.body.link
    res.send(imagelink)
    await db.collection('images').insertOne({imagelink})

})

app.listen(port, () =>{
    console.log('Server is listening')
})
