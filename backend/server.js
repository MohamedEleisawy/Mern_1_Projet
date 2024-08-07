// import http from 'http';
// http.createServer((req, res) => {
//     res.writeHead(400, 'bad request' , {'Content-Type': 'text/html'});
//     res.write(req.url);

//     if (req.method === 'POST') {
//         res.write('POST request received');
//     }

//     res.end();
// }).listen(5050, 'localhost');

import express from 'express';
import { postRoutes } from './routes/postRoutes.js';
import mongoose from 'mongoose';
// import {MonngoClient} from 'mongodb';
// const PostModel = require("./mdels/PostModel.js");

const app = express();
app.use(express.json()); // middleware to parse incoming requests with JSON payloads

app.use('/api/posts', postRoutes);

mongoose.connect('mongodb://localhost:27017/', { dbName: 'Mern_Test'})
  .then(()=>{
    console.log('MongoDB connected successfully');
    app.listen(5050, 'localhost', () => {
      console.log('Server is running on http://localhost:5050');
    });
  })
  .catch((err) => {console.log(err);});


// mongodb+srv://e5yPYEVvCVp29pRP:e5yPYEVvCVp29pRP@mern1.2oqfsl8.mongodb.net/data?retryWrites=true&w=majority&appName=mern1