const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

app.use(cors());

const taskRoute = require('./route/taskRoute');
app.use('/api/task', taskRoute);

const url = "mongodb://127.0.0.1:27017/taskmanager"

const dbConnect = async ()=>{
    mongoose.connect(url);
    console.log("connected to mongodb")
}

const port = 5300;
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
    dbConnect();
})