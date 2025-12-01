import projectRoutes from "../routes/projectRoutes.js";
import skillsRoutes from '../routes/skillsRoutes.js';
import contactRoutes from "../routes/contactRoutes.js"
import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from '../config/database.js';


dotenv.config();

const app = express();

// CORS configuration - allow all origins for now
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection (cached for serverless)
// For serverless, try to connect on module load
if (process.env.VERCEL) {
  connectDatabase().catch(err => {
    console.error('Initial database connection attempt failed:', err);
  });
}

const ensureDatabaseConnection = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }
  
  // Try to connect
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Middleware to ensure database connection before handling requests
app.use(async (req, res, next) => {
  try {
    await ensureDatabaseConnection();
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      message: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.send("backend is running");
});

app.use("/api/projects", projectRoutes);
app.use('/api/skills', skillsRoutes);
app.use("/api/contact", contactRoutes);

// Only start server when not in serverless environment (Vercel)
const PORT = process.env.PORT || 8000;
if (!process.env.VERCEL) {
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
}

export default app;
