const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct}=require('../middleware.js');
const router = express.Router(); //mini instance/application;


// READ
router.get('/products' , async (req,res)=>{
    try{
    let allProducts = await Product.find();
    res.render('product/index' , {allProducts})
    }
    catch(e){
        res.status(500).render("error",{err:e.message});
    }
    //catched error e has a field called message which shows what kind of error is being shown
})

// SHOW A NEW FORM
router.get('/product/new' , (req,res)=>{
    // try{
    res.render('product/new');
// }
    // catch(e){
        // res.status(500).render("error",{err:e.message});
    // }
})

// ACTUALLY ADDING IN THE DATABASE
router.post('/products' ,validateProduct, async(req,res)=>{ //the middleware will now SSV when actually adding the product
    //Flow:
    //1. server starts and app.js runs
    //2. goes to Product routes
    //3. validates through requiring middleware
    //4. goes to middleware and check if any error is to be given
    //5. if no error then next() is executed.
    // WHAT IS next()?? it is the functionality after validateProduct
    // try{
    let {name,img , price , desc} = req.body;
    await Product.create({name,img , price , desc});
    res.redirect('/products');
// }
    // catch(e){
        // res.status(500).render("error",{err:e.message});
    // }
})

// TO SHOW A PARTICULAR PRODUCT
router.get('/products/:id' ,validateProduct, async(req,res)=>{
    try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('product/show' , {foundProduct})}
    catch(e){
        res.status(500).render("error",{err:e.message});
    }
    //err:e.message=> err=key and e.message is value. So value is thrown which is catched by 
})

// FORM TO EDIT A PARTIICULAR PRODUCT
router.get('/products/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    console.log('sam1',foundProduct,'sam');
    res.render('product/edit' , {foundProduct})
})


// TO ACTUALLY CHANGE IN db
router.patch('/products/:id' , async(req,res)=>{
    try{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img , price , desc});
    res.redirect(`/products/${id}`);}
    catch(e){
        res.status(500).render("error",{err : e.message});
    }
})

// DELETE THE EXISTING PRODUCT
router.delete('/products/:id' , async(req,res)=>{
    try{
    let {id} = req.params;
    // let product=await Product.findById(id);
    // for(let idd of product.reviews){
    //    await Review.findByIdAndDelete(idd)
    // }
    await Product.findByIdAndDelete(id)
    res.redirect('/products');}
    catch(e){
        res.status(500).render("error",{err:e.message});
    }
})


// export so that you can use it in app.js
module.exports = router;