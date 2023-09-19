const User = require("../models/User");
const Product = require("../models/Product")
const bcrypt = require("bcrypt");
const auth = require("../auth");

/* Product Registration / Creation */
// module.exports.regProd = (req, res) => {
//     let newProd = new Product({
//         productName: req.body.productName,
//         productCategory: req.body.productCategory,
//         productDescription: req.body.productDescription,
//         price: req.body.price,
//         quantity: req.body.quantity,
//     })
//     return newProd
//     .save()
//     .then((prod, err) => {
//         if(err){
//             return res.send("Product Registration failed!")
//         }else{
//             return res.send("Item registered!")
//         }
//     })
//     .catch(err => res.send(err))
// }
module.exports.regProd = async (req, res) => {
    try {
        const existProd = await Product.findOne({productName: req.body.productName});
        if(existProd){
            return res.send("Product already added.")
        }
        let newProd = new Product({
            productName: req.body.productName,
            productCategory: req.body.productCategory,
            productDescription: req.body.productDescription,
            price: req.body.price,
            quantity: req.body.quantity
        })

        await newProd.save()
        return res.send("Product successfully added!")
    }catch(err){
        console.error(err)
        return res.send(false)
    }
}

/* List all products */
module.exports.listProd = (req, res) => {
    return Product.find({}).then(prodList => {
        if(prodList === 0){
            return res.send("No product registered yet!")
        }else{
            return res.send(prodList)
        }
    })
}

/* List all active products */
module.exports.statusProd = (req, res) => {
    return Product.find({ isActive: true })
        .select("productName quantity")
        .then((prodList) => {
            if (prodList.length === 0) {
                return res.send("No product registered yet!");
            } else {
                return res.send(prodList);
            }
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        });
};

/* List Single Product */
module.exports.getProd = (req, res) => {
    return Product.findOne({productName: req.body.productName})
        .select("productName productDescription quantity isActive")
        .then(sgProd => {
        if(!sgProd){
            return res.send("Cannot find product, please specify!");
        }else {
            return res.send(sgProd);
        }
    })
}

/* Update Product (ADMIN ONLY) */
module.exports.updProd = (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.send("Please specify product for updating.")
    }
    return Product.findByIdAndUpdate(req.params.id, req.body).then((prodId, err) => {
        if(!prodId){
            return res.send("Product does not exist");
        }else{
            let response = {
                message: "Product Successfully Updated!",
                updates: prodId
            }
            return res.send(response);
        }
        
    })
}

/* Archive Product */
module.exports.archiveProd = (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.send("Please specify product for archiving.")
    }
    return Product.findOneAndUpdate(req.body, {isActive: false})
    .then((prod) => {
        if(!prod){
            return res.send("Product not found for archiving");
        }else{
            let response = {
                message: "Product Successfully Archived!",
                updates: prod
            }
            return res.send(response);
        }
    })
}

/* Activate Product */
module.exports.activateProd = (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.send("Please specify product for activation.")
    }

    return Product.findOneAndUpdate(req.body, {isActive: true})
    .then((prod) => {
        if(!prod){
            return res.send("Product not found for activation");
        }else if(prod.isActive === true){
            return res.send("Product is already active!")
        }else{
            let response = {
                message: "Product Successfully Activated!",
                product: prod
            }
            return res.send(response);
        }
    })
}