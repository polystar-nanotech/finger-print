import express from 'express';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes'; 
import cors from "cors"
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register Routes
app.use('/students', studentRoutes);
app.get('/', (req, res)=>{
    res.status(200).json({message: "the server is running"})
})

export default app;
