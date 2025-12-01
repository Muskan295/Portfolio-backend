import Project from '../models/Project.js'
import  express from 'express';

const router=express.Router();

router.get('/',async(req,res)=>{
    const projects=await Project.find();
    res.json(projects);
});


router.post('/',async(req,res)=>{
    const project=new Project(req.body);
    const saved=await project.save();
    res.json(saved);
});

router.post('/add',async(req,res)=>{
    try{
        const {title,description,link,tech,image}=req.body;
        const newProject=new Project({
            title,
            description,
            image,link,tech
        });
        await newProject.save();
        res.json({success: true, message: "Project added✅"});
    }catch(error){
        res.status(500).json({success:false,error});
    }
})

export default router;
