import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {   
        title: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },        
        due: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", TaskSchema);
