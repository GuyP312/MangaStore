import express from 'express';
import { Manga } from '../models/mangaModel.js'
const router = express.Router();



// Save a new manga
router.post('/', async (req,res)=>{
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
//Get all Mangas
router.get('/', async (req,res)=>{
    try{
        const mangas = await Manga.find({}); // empty object to get all the data

        return res.status(200).json({
            count: mangas.length,
            data: mangas
        });
    }
    catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

//Get manga by id
router.get('/:id', async (req,res)=>{ // :id get id
    try{
        const { id } = req.params;
        const mangas = await Manga.findById(id); //find id

        return res.status(200).json({
            count: mangas.length,
            data: mangas
        });
    }
    catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

//Update a Manga
router.put('/:id', async (req,res)=>{
    try{
        if ( //check if the data sent have all 3 fields
        !req.body.title || 
        !req.body.author || 
        !req.body.publishYear
        ) {
        return res.status(400).send({message: "All fields are required"});
        }
        const { id } = req.params;
        const result = await Manga.findByIdAndUpdate(id,req.body); //update the body of the database

        if (!result){ //if id not found
            res.status(500).json({message: 'Manga not found'});
        }
        return res.status(200).send({message: 'Manga updated succesfully'});


    } catch (err) {
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

//Delete a Manga
router.delete('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await Manga.findByIdAndDelete(id); //delete the manga with this id
        if (!result){ //if id not found
            return res.status(404).json({message: 'Manga not found'});
        }
        return res.status(200).json({message: 'Manga deleted successfully'});
    } catch (err){
        console.log(err);
        return res.status(500).send({message: err.message});
    }
})

export default router;