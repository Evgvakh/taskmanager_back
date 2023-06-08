import mongoose from "mongoose";

export const connectToDB = () => {
  
    mongoose.connect(
      "mongodb+srv://evgvakh:1234@taskmanager.imdqbh4.mongodb.net/taskmngr?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("DB error", err));
};
