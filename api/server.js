import projectRoutes from "../routes/projectRoutes.js";
import skillsRoutes from '../routes/skillsRoutes.js';
import contactRoutes from "../routes/contactRoutes.js"
import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv';
import  mongoose from 'mongoose';
import connectDatabase from '../config/database.js';


dotenv.config();



const app = express();

app.use(cors({
  origin:'https://portfolio-red-ten-cebl03r3j8.vercel.app/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/projects", projectRoutes);
app.use('/api/skills', skillsRoutes);
app.use("/api/contact", contactRoutes);


app.get('/', (req, res) => {
    res.send("backend is running");
});

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
export default app;