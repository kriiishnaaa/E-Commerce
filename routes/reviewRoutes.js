const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); 
const Review = require('../models/Review');
const {validateReview}=require('../middleware.js');//SSV

router.post('/products/:id/review',validateReview,async (req,res)=>{
    let {id} = req.params;
    let {rating , comment} = req.body;
    let product= await Product.findById(id);
    let review = new Review({rating , comment});
    product.reviews.push(review);
    await product.save();
    await review.save();
    res.send("review submitted")
});



module.exports = router;