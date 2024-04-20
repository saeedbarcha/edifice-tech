import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    title:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
},{
    timestamps:true
});

const Project = mongoose.model("Project", projectSchema);

export default Project;