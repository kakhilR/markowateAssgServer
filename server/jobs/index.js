import Agenda from 'agenda';
import axios from 'axios';
import dotEnv from 'dotenv';
dotEnv.config();




export const agendaJob = new Agenda({
    db:{
        address : process.env.mongodb_uri,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "jobs",
    },
})

agendaJob.on('ready',()=> console.log('Agenda is ready'))
agendaJob.on('error',()=> console.log('error connection with agenda'))
await agendaJob.start();

// simple job to fetch user with given name from github api
agendaJob.define("firstJob", async (job)=>{
    let result = await axios(`https://api.github.com/users/${job.attrs.data.username}`)
    const {id, name, location} = result.data
    console.log("user id:",id, ", name:", name, ", location:",location,);
    job.save();
})


