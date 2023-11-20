import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';


const app = express()
const port = 4000;