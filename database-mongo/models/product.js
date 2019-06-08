const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength:100
    },
    description:{
        required: true,
        type: String,
        maxlength:100000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping:{
        required: true,
        type: Boolean,
        default: true
    },
    available:{
        required: true,
        type: Boolean
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sold:{
        type: Number, //to determine how many items of this you have sold, so you can render the best selling items
        maxlength: 100,
        default: 0
    },
    publish:{     // to display it on the client when you chose to make it available to the public
        required: true,
        type: Boolean
    },

    images:{
        required: true,
        type: Array,
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);
module.exports = { Product }