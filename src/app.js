import express from 'express';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes'; 
import cors from "cors"
const app = express();
// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json());

// Register Routes
app.use('/students', studentRoutes);
app.get('/', (req, res)=>{
    res.status(200).json({message: "the server is running"})
})

export default app;
