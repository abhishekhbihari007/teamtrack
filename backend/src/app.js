import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/auth-routes.js';
import projectRoutes from './routes/project-routes.js';
import taskRoutes from './routes/task-routes.js';
import userRoutes from './routes/user-routes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({ contentSecurityPolicy: false }));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  const uri = process.env.MONGO_URI || process.env.MONGO_URL || '';
  const masked = uri.replace(/:([^@]+)@/, ':****@');
  res.status(200).json({
    status: 'ok',
    dbState: mongoose.connection.readyState, // 0=disconnected 1=connected 2=connecting
    uriPreview: masked.slice(0, 80) || 'NOT SET'
  });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/v1/auth', authRoutes);
app.use('/v1/projects', projectRoutes);
app.use('/v1/tasks', taskRoutes);
app.use('/v1/users', userRoutes);

// ── Serve React frontend in production ────────────────────────────────────────
if (isProduction) {
  // Nixpacks sets cwd to /app (repo root), client/dist is built there
  const dist = path.resolve(process.cwd(), 'client/dist');

  if (fs.existsSync(dist)) {
    console.log(`[Static] Serving frontend from: ${dist}`);
    app.use(express.static(dist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/v1') || req.path === '/health') return next();
      res.sendFile(path.join(dist, 'index.html'));
    });
  } else {
    console.warn(`[Static] dist not found at: ${dist} — frontend will not be served`);
  }
}

// ── Error handlers ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
