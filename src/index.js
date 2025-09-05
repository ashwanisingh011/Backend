// import mongoose from 'mongoose';
// import { DB_NAME } from './constant';
// import express from 'express';

import connectDB  from './db/index.js';
import dotenv from 'dotenv'

// First approach to connect to mongoDB
/*
(async ()=>{
    try {
      await  mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`)
      app.on('error', (error)=>{
        console.log("ERROR", error);
        throw error;
    })
    
    app.listen(process.env.PORT)
        console.log(`App is running on port ${process.env.PORT}`);
        
    } catch (error) {
        console.error("ERROR", error);
        throw error;
    }
}) ()

*/

dotenv.config({
    path: './.env'
});

try {
    await connectDB();
} catch (error) {
    console.error("ERROR: Failed to connect to MongoDB", error);
    process.exit(1);
}