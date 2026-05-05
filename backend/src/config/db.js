import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = (process.env.MONGO_URI || process.env.MONGO_URL || '').replace(/^["']|["']$/g, '').trim();

  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set!');
  }

  const masked = uri.replace(/:([^@]+)@/, ':****@');
  console.log(`[Database] Attempting connection to: ${masked}`);
  console.log(`[Database] Initial State: ${mongoose.connection.readyState}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      bufferCommands: true,
    });
    console.log(`✅ MongoDB Connected | Host: ${mongoose.connection.host} | State: ${mongoose.connection.readyState}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export { connectDB };
export default connectDB;
