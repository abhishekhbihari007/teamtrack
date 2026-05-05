import dotenv from 'dotenv';
import crypto from 'crypto';

// Polyfill for older Node versions where crypto is not global in ESM
if (typeof global !== 'undefined' && !global.crypto) {
  global.crypto = crypto;
}

dotenv.config();

// Strip quotes AND reject the literal string "undefined"
const strip = (v) => {
  if (!v) return undefined;
  const s = String(v).replace(/^["']|["']$/g, '').trim();
  return s === 'undefined' || s === '' ? undefined : s;
};

process.env.MONGO_URI  = strip(process.env.MONGO_URI) || strip(process.env.MONGO_URL);
process.env.JWT_SECRET = strip(process.env.JWT_SECRET);
process.env.NODE_ENV   = strip(process.env.NODE_ENV) || 'production';
process.env.CLIENT_URL = strip(process.env.CLIENT_URL);

console.log('[ENV]', {
  NODE_ENV:   process.env.NODE_ENV,
  PORT:       process.env.PORT,
  MONGO_URI:  process.env.MONGO_URI  ? `SET → ${process.env.MONGO_URI.slice(0, 35)}...` : '❌ NOT SET',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : '❌ NOT SET',
});

import mongoose from 'mongoose';
import connectDB from './config/db.js';
import app from './app.js';

const PORT = parseInt(String(process.env.PORT || '5000').replace(/\D/g, ''), 10) || 5000;

mongoose.set('bufferTimeoutMS', 30000);

const start = async () => {
  connectDB()
    .then(() => console.log('✅ MongoDB ready'))
    .catch((err) => console.error('❌ MongoDB failed:', err.message));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 TeamTrack → port ${PORT} | ${process.env.NODE_ENV}`);
  });
};

process.on('uncaughtException',  (err) => console.error('[uncaughtException]',  err));
process.on('unhandledRejection', (err) => console.error('[unhandledRejection]', err));

start();
