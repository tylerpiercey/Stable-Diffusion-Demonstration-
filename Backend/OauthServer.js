import jwt from "jsonwebtoken";
import 'dotenv/config';
import { google } from 'googleapis';
import axios from 'axios';
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import fetch from "node-fetch";

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
    console.log("Generated OauthURL:", url)
    return url;
};

const googleOauthURL = getGoogleOauthUrl();


const getAccessAndBearerTokenUrl = ({ accessToken }) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`

const getGoogleUser = async ({ code }) => {
    const { tokens } = await oauthClient.getToken(code);
    const response = await axios.get(
        getAccessAndBearerTokenUrl({ accessToken: tokens.access_token }),
        { headers: { Authorization: `Bearer ${tokens.access_token}`} },
    );
    return response.data;
}
const getGoogleOauthUrlRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        const url = getGoogleOauthUrl();
        res.status(200).json({ url });
    }
};

// Google OAuth callback route
app.get('/api/google/oauth', async (req, res) => {
    try {
        const { code } = req.query;
        console.log("Authorization code:", code); 

        const { tokens } = await oauthClient.getToken(code);
        console.log("Tokens received:", tokens); 

        const accessToken = tokens.access_token;
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        const profile = await response.json();
    } catch (error) {
        console.error('Error during Google OAuth:', error);
        res.status(500).json({ message: 'Error during Google OAuth' });
    }
});