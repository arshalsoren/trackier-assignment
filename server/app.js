const express=require('express');
const app=express();
const mongoose=require('mongoose');

// Connecting to MongoDB
const mongoURL = "mongodb+srv://arshal:soren@cluster0.ssgyiyi.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true)
mongoose.connect(mongoURL, {
    useNewUrlParser: true
}).then(console.log("Connected to Database"))
.catch((e)=>{
    console.log({error: e})
})

// Running Node App
app.listen(8080, console.log("Server started, Running on 8080..."))