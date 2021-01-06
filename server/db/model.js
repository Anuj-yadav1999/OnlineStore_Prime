const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    payId: {
        type: Number
    },
    id: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: Number
    },
    title: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;