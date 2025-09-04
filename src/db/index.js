import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`)
        console.log(`\n MonogoDB connected DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("ERROR", error);
        process.exit(1);
    }
}