import mongoose from "mongoose";
import dotenv from "dotenv"


const connectToDB = async () => {
    // console.log(process.env.MONGO_URL);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Failed to connect Database", error);
        process.exit(1);
    }
}

export default connectToDB;