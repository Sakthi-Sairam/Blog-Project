const mongoose = require('mongoose')
const {marked} = require('marked')
const slugify = require('slugify')


const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    createdAtMillis: {
        type: Number,
        default: () => Date.now()  // stores time in milliseconds
    },
    slug:{
        type: String,
        required: true,
        unique: true
     },
})
articleSchema.pre('validate',function(next){
    if(this.title){
        let r = (Math.random() + 1).toString(36).substring(7);
        this.slug = slugify(this.title, {lower: true, strict: true}) + "-"+r;
    }
    next()
})
module.exports = mongoose.model('Article',articleSchema)