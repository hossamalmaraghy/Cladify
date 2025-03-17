import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/couldinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

// Wrap initialization in an async function
const startServer = async () => {
  await connectDB();           // Ensure DB is connected
  await connectCloudinary();   // Ensure Cloudinary is configured

  const app = express();
  const port = process.env.PORT || 4000;

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // API Endpoints
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);

  app.get('/', (req, res) => {
    res.send("API Working");
  });

  app.listen(port, () =>
    console.log('Server Started On PORT : ' + port)
  );
};

startServer();
