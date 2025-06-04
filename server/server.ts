console.log('🚀 server.ts started');

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToMongo } from './config/mongoClient';
import usersRoute from './routes/UserRoutes';
import ticketRoute from './routes/TicketRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3020;

const allowedOrigins = [
  'http://localhost:5173',
  'https://e2425-wads-l4bcg3-client.csbihub.id',
  'http://e2425-wads-l4bcg3-client.csbihub.id'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Add route logging
console.log('🔍 Setting up routes...');

// Routes
console.log('📝 Mounting user routes at /service/user');
app.use('/service/user', usersRoute);
console.log('📝 Mounting ticket routes at /service/tickets');
app.use('/service/tickets', ticketRoute);

// Log all registered routes
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    console.log(`🛣️  Route: ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        const path = handler.route.path;
        const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
        console.log(`🛣️  Route: ${methods} ${path}`);
      }
    });
  }
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is working!');
});

// ✅ Move connectToMongo BEFORE starting server
async function startServer() {
  try {
    await connectToMongo();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); // Stop the app if DB connection fails
  }
}

startServer();
