// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import entryRoutes from './routes/entries.js';

dotenv.config();

const app = express();

// ---------- Core middleware ----------
app.use(express.json());

// Allow both localhost & 127.0.0.1 (Vite can use either)
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,           // e.g. http://localhost:5173
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow tools without Origin (curl/Postman) and same-origin
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// Respond to all preflight requests explicitly (helps avoid opaque “Load failed”)
app.options(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ---------- Health check ----------
app.get('/', (req, res) => res.json({ status: 'ok' }));

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

// ---------- Start server after DB connects ----------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on :${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });

// ---------- (Optional) basic error handler ----------
app.use((err, req, res, next) => {
  // Handle CORS errors or any thrown errors gracefully
  if (err?.message?.startsWith('Not allowed by CORS')) {
    return res.status(403).json({ message: err.message });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});
