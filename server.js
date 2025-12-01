import projectRoutes from "./routes/projectRoutes.js";
import skillsRoutes from './routes/skillsRoutes.js';
import contactRoutes from "./routes/contactRoutes.js"
import express from 'express';
import  cors from 'cors' ;
import  dotenv from 'dotenv';
import  mongoose from 'mongoose';
const  PORT=5000 || process.env.PORT;

dotenv.config();

mongoose.connect(process.env.Mongo_URI).
then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/projects", projectRoutes);
app.use('/api/skills',skillsRoutes);
app.use("/api/contact",contactRoutes);



app.get('/',(req,res)=>{
    res.send("backend is running");
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})


