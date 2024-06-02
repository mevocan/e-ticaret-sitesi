import mongoose from "mongoose";
const dbConnect = async () => {
 if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to DB");
 return;
 }
 await mongoose.connect(process.env.DB_URI);
 console.log("Connected to DB");
};
export default dbConnect
