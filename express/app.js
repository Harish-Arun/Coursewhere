var express=require('express');
var app=express()
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/styles',express.static('styles'));
app.use('/images',express.static('images'));
app.use('/data',express.static('data'));
const port=5002;
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render("home.ejs");
});
app.get('/login',function(req,res){
    res.render("login.ejs");
});
app.post('/login',function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    if(email=="harish@ssn" && password=="Act@1234")
        res.redirect('/search');
    else
        res.redirect('/login');
});
app.get('/register',function(req,res){
    res.render("register.ejs");
});
app.get('/search',function(req,res){
    res.render("search.ejs");
});
app.listen(port);
console.log("runs in" + port);
console.log(__dirname);