const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
//iss schema mei humne password aur username nhi diya kyuki voh passport local mongoose apne ap sambhal lega
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        // required:true
    },
    passport:{
        type:String,
        trim:true,
        min:8,
        max:30
    }
});
userSchema.plugin(passportLocalMongoose);
//taki register() method apne ap password ko hash kr k user ka alg account db mei store kar paye


let User=mongoose.model('users',userSchema);
module.exports=User;