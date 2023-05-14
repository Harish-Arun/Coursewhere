var express=require('express');
var app=express()
var bodyParser=require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const host='192.168.29.246';
const port=5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/styles',express.static('styles'));
app.use('/images',express.static('images'));
app.use('/data',express.static('data'));

var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb+srv://harishcriro07:Harish2002@test-cluster.e59v3q9.mongodb.net/Coursewhere");

var userSchema= new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    phoneno: String,
    DOB: Date
});

var User=mongoose.model("User",userSchema,"User");

//session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());
var session;


app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render("home.ejs");
});
app.get('/login',function(req,res){
    session=req.session;
    if(session.userid){
        res.redirect("/search");
    }
    else{
        res.render("login.ejs");
    }
});
app.post('/login',function(req,res){
    let email_f=req.body.email;
    let password_f=req.body.password;
    User.findOne({
        email: email_f
    })
    .then(function(data,err){
        if(!err){
            if(data){
                if(data.password==password_f){
                    session=req.session;
                    session.userid=data.email;
                    console.log(req.session);
                    res.redirect("/search");
                }
                else{
                    res.redirect("/");
                }
            }
            else{
                res.redirect("/register");
            }
        }
        else{
           console.log(err);
        }
    });
    
});
app.get('/register',function(req,res){
    session=req.session;
    if(session.userid){
        res.redirect("/search");
    }
    else{
        res.render("register.ejs");
    }
});

app.post('/register',function(req,res){
    const user =new User(req.body);
    user.save()
        .then(item=>{
            console.log(user);
            session=req.session;
            session.userid=data.email;
            console.log(req.session);
            res.redirect("/search");
        })
        .catch(err=>{
            console.log(err);
        });
});
app.get('/search',function(req,res){
    if(req.session.userid){
        res.render("search.ejs");
    }
    else{
        req.session.error="Acess Denied";
        res.redirect("/");
    }

});

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
})
app.listen(port,host,function(){
    console.log("runs in http://" + host+":"+port);
    console.log(__dirname);
});