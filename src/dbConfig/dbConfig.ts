import mongoose from "mongoose";

export const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected");
        })

        connection.on('error',(error)=>{
            console.log("MongoDB connection error",error);
            process.exit();
        })
    } catch (error) {
        console.log("error connecting to db");
    }
}