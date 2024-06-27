const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authroutes=require('./routes/authroutes');
const methodOverride = require('method-override');
const session=require('express-session');

const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');


mongoose.set('strictQuery' , true); 
mongoose.connect('mongodb://127.0.0.1:27017/krishna') 
.then(()=>{console.log("DB CONNECTED")})
.catch((err)=>{console.log("error in DB" , err)})

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true})) 
app.use(methodOverride('_method'));
//middlewares are the softwares that are used by diiferent applications for communicating with each other


let configSession={
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}
app.use(session(configSession));


passport.use(passport.initialize());
//storage mei initilize kara paye
passport.use(passport.session());
//session ki storage ka access mil paye
passport.serializeUser(User.serializeUser());
//persistent login i.e. route change krne pr bar bar credentials nhi daalna padega
passport.deserializeUser(User.deserializeUser());
//login session end krna

//middleware for local strategy ki yeh strategy lga kr authenticate kr
//autheticate:static method that is used to verify the username or passwords 
passport.use(new LocalStrategy(User.authenticate()));
//taki user ko authenticate kr sake

//saare routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authroutes);


//ek bar seed krna hota h dummy data toh commend kr diya kro
//seedDB()



const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`server connected at port: ${PORT}`);
})


//persistent login:to be logged in for a particular amt of time even though we are not using it
//as soon as logged out, deserialized