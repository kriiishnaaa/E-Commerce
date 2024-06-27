const mongoose = require('mongoose');
const Product = require('./models/Product');

let products = [
    
    //     name:"Ted Mosby" ,
    //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-08b0B78iDCCSff-MSGGGF7gLHKHccuVt9w&usqp=CAU",
    //     price: 1500000 ,
    //     desc: "Robinnn"
    //  }
    // 
    {
        name:"Phoebe Buffay" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVoQG9C0OV0Gw7ro9xr9INXvEqeUwlmBpig&usqp=CAU",
        price: 2500000,
        desc: "Smelly Cat.. What are they feeding you??"
    },
    {
        name:"Robin Scherbatsky" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6i2TUIFaYR59cVdy0u3giDuCrRd0nt6lNeg&usqp=CAU",
        price: 2500000,
        desc: "But um...."
    }

]


async function seedDB(){
    await Product.insertMany(products);
    console.log("Data seeded");
}

module.exports = seedDB;