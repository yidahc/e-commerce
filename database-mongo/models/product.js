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
    amount:{
        type: Number,
        maxlength: 4,
        default: 1
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


/*
fenty -> 5cfe22dfdcbc2020bfa27414
it-> 5cfe2358225e8724103fb270
// Dose Of Colors -> "5cfb477eb2d223293738504b",
// Sigma Beauty -> "5cfb4789b2d223293738504c"
// E.L.F -> "5cfb47a1b2d223293738504d"
// Becca -> "5cfb47b5b2d223293738504e"
// W n' W -> "5cfb47bcb2d223293738504f"
*/


/*
// labiales -> "5cfb46aab2d2232937385048"
// brochas -> "5cfb469fb2d2232937385047"
// rubores -> "5cfb4693b2d2232937385046"
// iluminadores -> "5cfb46ceb2d2232937385049"
// paletas de sombras -> "5cfb46ddb2d223293738504a"
// foundations-> 5cfe238c225e8724103fb271
concealers -> 5cfe23b7e5891a24af40890a

*/
