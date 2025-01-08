import mongoose from "mongoose"; //mongoose is package to create schema / connect to mongoDB 

const mangaSchema = mongoose.Schema( // assign that the data in the model will have this specified field
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        rating:{
            type: Number,
            required: true
        },
        picture:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true, //timestamps: true --> add 2 extra field : createdAt updateAt
    }
)

export const Manga = mongoose.model('Manga',mangaSchema); //create a model call manga in DB