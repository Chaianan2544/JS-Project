require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/User");

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');



mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))


app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('../display/index');
});

app.get('/login',(req,res)=>{
    res.render('../display/login');
});

app.get('/register',(req,res)=>{
  res.render('../display/register');
});

app.get('/logged',(req,res)=>{
  res.render('../display/logged');
});

app.get('/cart', (req,res)=>{
  res.render('../display/cart');
});


app.post('/login',(req,res)=>{
  res.redirect('/logged');
});


app.post('/register', async(req,res)=>{
  const user=new User({
    email:req.body.email,
    name:req.body.name,
    password:req.body.password
  });
  await user.save();
  res.redirect("/login");
});


app.listen(3000, () => console.log('Server Started'))