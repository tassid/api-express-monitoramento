import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_URL } = process.env;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL, {
            minPoolSize: 10,
            socketTimeoutMS: 60000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        
        return conn;
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:");
        console.error(error.message);
        process.exit(1); 
    }
};

export default connectDB;