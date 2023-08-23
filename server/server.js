const express=require('express');
const mongoose=require('mongoose'); 
const router=require('./Routes');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/CRUD',{ useNewUrlParser: true,useUnifiedTopology: true,});

app.use('/',router);

app.listen(3001);