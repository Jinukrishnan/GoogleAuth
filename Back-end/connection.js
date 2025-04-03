import mongoose from "mongoose";
export default async function connection() {
    const url = "mongodb://localhost:27017/GoogleAuth";

    const db=await mongoose.connect(url);
    console.log("database connected");
    return db
    
    
}