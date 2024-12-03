import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("DB already connected...");
        return;
    }

try {
   await mongoose.connect(process.env.MONGODB_URL!, {
        dbName :"Sabaia_Admin"
    });

    isConnected=true;
console.log("DB connected");
} catch (error) {
    console.log("Error connecting",error);
}}

