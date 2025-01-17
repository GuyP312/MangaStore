import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Manga } from "./models/mangaModel.js";
import mangasRoute from './routes/mangasRoute.js';
import authRoute from './routes/authRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer'; //use for uploading photo through formData

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
app.use('/api/auth', authRoute); // create auth route for login/logout 

// Images Routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images',express.static(path.join(__dirname, 'images'))); // make the images available at localhost:PORT/images/imagesname.ext

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
