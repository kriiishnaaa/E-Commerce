const mongoose = require('mongoose');

// creating product schema
let productSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : true
    },
    img: {
        type : String,
        trim : true
    },
    price: {
        type : Number,
        min : 0,
        required : true
    },
    desc: {
        type : String,
        trim : true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

productSchema.post('findByIDAndDelete',async function(products){
    if(products.reviews.length>0){
        await Review.deleteMany({_id:{$in:products.reviews}});
    }
})

// creating model
let Product = mongoose.model('products' , productSchema )

module.exports = Product; //sending the model to be used anywhere when required


