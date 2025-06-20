console.log('🚀 server.ts started');

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import { connectToMongo } from './config/mongoClient';
import usersRoute from './routes/UserRoutes';
import ticketRoute from './routes/TicketRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3020;

const allowedOrigins = [
  'https://e2425-wads-l4bcg3-client.csbihub.id',
];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// app.options('*', cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}
app.use(cors(corsOptions))
// app.options('*', cors(corsOptions))

app.use(express.json());

// // Add request logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// Routes
app.use('/service/user', usersRoute);
app.use('/service/tickets', ticketRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.load('./utils/swagger.yaml')))

// // app.get('/', (_req: Request, res: Response) => {
// //   res.send('Server is working!');
// // });

// // Add a catch-all route for undefined routes
// // app.use('/*', (_req: Request, res: Response) => {
// //   res.status(404).send('Route not found');
// // });
// 
// 
// // // Handle undefined routes
// // app.all('/{*any}', (req, res, next) => {
// //   next("Server not found")
// // });

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
