import express from 'express';
import multer from 'multer'; //use for uploading photo through formData
import { v4 as uuidv4 } from 'uuid'; //generate random id
import { Manga } from '../models/mangaModel.js'
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({ 
    destination: function (req,file,cb){ //upload photo destination to images directory
        cb(null,'images'); 
    },
    filename: function(req,file,cb){ // the file name that will be upload to images directory
        cb(null,uuidv4()+'-'+Date.now()+ path.extname(file.originalname)); // random id + datetime + original file extension
    }
})

const fileFilter = (req,file,cb) => { //filter the file type to only take jpeg jpg and png
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter }); // put it into variable upload --> into this storage with this file filter


// Save a new manga
router.post('/',upload.single('picture'), async (req,res)=>{ // upload.single(picture) for uploading picture through formData
    try{
        if ( //check if the data sent have all the field required
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear ||
            !req.body.description ||
            !req.body.rating ||
            !req.file
        ) {
            return res.status(400).send({message: "All fields are required"});
        }
        const newManga = {  // make variable to assign the data sent
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            description: req.body.description,
            rating: req.body.rating,
            picture: req.file.path
        };

        const manga = await Manga.create(newManga); // send the data to Manga model created in another file
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
router.put('/:id',upload.single('picture'), async (req,res)=>{ 
    try{
        if ( //check if the data sent have all the field required
        !req.body.title || 
        !req.body.author || 
        !req.body.publishYear ||
        !req.body.description ||
        !req.body.rating
        ) {
        return res.status(400).send({message: "All fields are required"});
        }
        const { id } = req.params;
        const updateData = { ...req.body };
        if (req.file) { 
            updateData.picture = req.file.path; ///update the file path
          }
        const result = await Manga.findByIdAndUpdate(id,updateData,{ new: true }); //update the body of the database

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