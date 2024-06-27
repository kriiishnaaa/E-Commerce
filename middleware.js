// to create the middle wares in the whole project.
const {productSchema, reviewSchema}=require('./schema');
//step 2: validating in using JOI
const validateProduct=(req,res,next)=>{
    const {name,price,img,desc}=req.body
    const {error}=productSchema.validate({name,price,img,desc});
    //it returns two things error and value. But in our case value doesn't have any value. So we only deconstruct error
    if(error){
        return res.render('error')
    }
    //if no error then go to next()
    next();
}
//If the input is valid, then the error will be undefined. If the input is invalid, error is assigned a ValidationError object providing more information.
const validateReview=(req,res,next)=>{ 
const {rating,comment}=req.body
const {error}=productSchema.validate({rating,comment});
//it returns two things error and value. But in our case value doesn't have any value. So we only deconstruct error
if(error){
    return res.render('error')
}
//if no error then go to next()
next();
}
module.exports={validateProduct,validateReview};

