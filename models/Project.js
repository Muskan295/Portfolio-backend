import mongoose from 'mongoose';
const projectSchema=new mongoose.Schema({
    title:String,
    description:String,
    link:String,
    image:String,
    tech:[String]
});

const Project=mongoose.model("Project",projectSchema);
export default Project;