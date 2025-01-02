import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Manga } from "./models/mangaModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

// Save a new manga
app.post('/mangas', async (req,res)=>{
    try{
        if ( //check if the data sent have all 3 fields
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({message: "All fields are required"});
        }
        const newManga = {  // make variable to assign the data sent
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const manga = await Manga.create(newManga); // send the data to mongodb 
        return res.status(201).send(manga);

    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

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
