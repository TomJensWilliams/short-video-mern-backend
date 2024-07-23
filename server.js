import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Videos from './dbModel.js';

import dotenv from 'dotenv';
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 9000;
const connection_url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.icls8te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
  /*
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    */
});

//API Endpoints
app.get('/', (req, res) => {
  res.status(200).send('Hello TheWebDev');
});

app.post('/v2/posts', async (req, res) => {
  try {
    const dbVideos = req.body;
    const data = await Videos.create(dbVideos);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.get('/v2/posts', async (req, res) => {
  try {
    const data = await Videos.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
