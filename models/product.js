import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Category from "./Category";
import Tag from "./Tag";
import User from "./User";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},{timestamps: true});

const ratingSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 2000,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true});


const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 160,
        text: true,
    },
    slug: {
        type: String,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 2000,
        text: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid price!`
        },
        maxlength: 32,
    },
    previousPrice: {
        type: Number,
        maxlength: 32,
    },
    color: String,
    brand: String,
    stock: Number,
    shipping: {
        type: Boolean,
        default: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    images:[
        {
            secure_url:{
                type: String,
                default: '',
            },
            public_id:{
                type: String,
                default: '',
            },
        }
    ],
    sold: {
        type: Number,
        default: 0,
    },
    likes: [likeSchema],
    ratings: [ratingSchema],

},{timestamps: true});

productSchema.plugin(uniqueValidator, { message: "already exists" });

export default  mongoose.models.Product ||  mongoose.model("Product", productSchema);
