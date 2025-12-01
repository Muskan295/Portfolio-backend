import express from 'express';

import Skills from "../models/Skills.js";
const router =express.Router();

router.get('/',async(req,res)=>{
    const skills=await Skills.find();
    res.json(skills);
});

router.post('/add',async (req,res)=>{
    try{
    const{category,name,percent,years,description}=req.body;
    if(!category || !name) {
        return res.status(400).json({success:false,message:"Missing fields"});
    }
    const newSkill=new Skills({
        category,
        name,percent,years,description,
    });
    await newSkill.save();
    res.json({success:true,message:'Skill added Successfully'});
}catch(error){
    res.status(500).json({success:false,error});
}
});


export default router;