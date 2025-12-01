import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    category:String,
    name:String,
    percent:Number,
    years:String,
    description:String
});

const Skills=mongoose.model("Skills",skillSchema);
export default Skills;