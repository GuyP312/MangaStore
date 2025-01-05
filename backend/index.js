import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Manga } from "./models/mangaModel.js";
import mangasRoute from './routes/mangasRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());
// Cross-Origin Resource Sharing
// app.use(cors({
//     origin: ["http://localhost:3000"], // allow requests from this url
//     methods: ["GET","POST","PUT","DELETE"],
//     allowedHeaders: ["Content-Type"],
    
  
// }));
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello World!");
});

// Routes
app.use('/mangas', mangasRoute); // any url after /mangas will be used inside this route

//Connect to mongoDB
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
})
