import express from 'express';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes'; 

const app = express();
app.use(bodyParser.json());

// Register Routes
app.use('/students', studentRoutes);

export default app;