import cors from 'cors';
import express from 'express';
import { agendaJob } from './jobs/index.js';
import { databaseConnection } from './models/connection.js';
import { userRoutes } from './routes/user.js';
const app = express();

const Port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

await databaseConnection();

app.use('/hello',(req,res)=>{
    res.send("hi")
})

agendaJob.now('firstJob',{username:'kumar'});

app.use('/api',userRoutes);


app.listen(Port,()=>{
    console.log(`listening on port ${Port}`)
})