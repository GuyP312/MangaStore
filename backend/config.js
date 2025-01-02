import dotenv from 'dotenv';
export const PORT = 5555;
dotenv.config()

export const mongoDBURL = process.env.mongoDBURL;