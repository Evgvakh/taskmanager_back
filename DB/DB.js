import mongoose from "mongoose";

export const connectToDB = () => {
  
    mongoose.connect(
      process.env.DATABASE
    )
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("DB error", err));
};
