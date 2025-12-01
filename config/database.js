import mongoose from 'mongoose';

// Cache the connection for serverless environments
let cachedConnection = null;

async function connectDatabase() {
  // If already connected, return cached connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is cached and not disconnected, use it
  if (cachedConnection && mongoose.connection.readyState !== 0) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI || process.env.Mongo_URI;

  if (!mongoUri) {
    throw new Error('Missing required environment variable: MONGO_URI or Mongo_URI');
  }

  try {
    const connectionOptions = {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
    };

    // For serverless, we want to reuse connections
    if (process.env.VERCEL) {
      connectionOptions.bufferCommands = false;
      connectionOptions.bufferMaxEntries = 0;
    }

    const connection = await mongoose.connect(mongoUri, connectionOptions);
    cachedConnection = connection;
    console.log('MongoDB connected');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error', error);
    throw error;
  }
}

export default connectDatabase;
