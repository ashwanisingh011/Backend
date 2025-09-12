// import mongoose from 'mongoose';
// import { DB_NAME } from './constant';
// import express from 'express';

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
import {app} from './app.js';
import connectDB  from './db/index.js';
import dotenv from 'dotenv'


dotenv.config({
    path: './.env'
});

// const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is running on port: ${process.env.PORT || 8000}`);
    })

})
 .catch ((err) => {
    console.log("Error in DB connection", err);
})
    