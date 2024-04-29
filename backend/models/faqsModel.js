import mongoose from "mongoose";

const faqsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
      },
},{
    timestamps:true
});

const Faqs = mongoose.model("Faqs", faqsSchema);

export default Faqs;