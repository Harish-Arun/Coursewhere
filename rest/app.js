var express=require('express');
var app=express()

const host='127.0.0.1';
const port=3000;



var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/Coursewhere");

var userSchema= new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    phoneno: String,
    DOB: Date
});

var User=mongoose.model("User",userSchema,"User");

var courseSchema= new mongoose.Schema({
    coursename: String,
    author: String,
    image: String,
    link: String,
    description: String
});
var Course=mongoose.model("Course",courseSchema,"Course");

app.get('/',function(req,res){
    res.status(200).json({msg:"Welcome to coursewhere"});
});
app.get('/register',function(req,res){
    res.status(200).json({msg:"Append ur details to the url like /register/:name/:email/:password/:phone"});
});
app.post('/register/:name/:email/:password/:phone',async function(req,res){
    try{
        var person={
            "Name": req.params.name,
            "email": req.params.email,
            "password": req.params.password,
            "phoneno": req.params.phone
          };
          await User.create(person);
          res.status(201).send('Created Successfully');
    }
    catch(err){
        res.status(400).json(error);
    }

});
app.get('/allusers',async function(req,res){
    var users= await User.find();
    res.json(users);
});
app.get('/remove',function(req,res){
    res.status(200).json({msg:"Append ur details to the url like /remove/:email"});
});
app.delete('/remove/:email',async function(req,res){
    try{
        var user=await User.deleteOne({"email":req.params.email});
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json(error);
    }
});
app.get('/display',async function(req,res){
    try{
        var course=await Course.find();
        res.status(200).json(course);
    }
    catch(err){
        res.status(400).json(err);
    }
});
app.listen(port,host,function(){
    console.log("runs in http://" + host+":"+port);
    console.log(__dirname);
});
