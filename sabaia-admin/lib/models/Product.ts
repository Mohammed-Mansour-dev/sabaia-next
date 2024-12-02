
import mongoose from "mongoose";



const productSchema =new mongoose.Schema({
  
    title:String,
  description:String,
  media:[String],
  price:{type:mongoose.Schema.Types.Decimal128, get:(v:mongoose.Schema.Types.Decimal128) =>{
    return parseFloat(v.toString());
  }} ,
  expense: {type:mongoose.Schema.Types.Decimal128, get:(v:mongoose.Schema.Types.Decimal128) =>{
    return parseFloat(v.toString());
  }},
  colors: [String],
  sizes: [String],
  tags:[String],
  category: String,
collections :[{type:mongoose.Schema.Types.ObjectId , ref :"Collection"}],
},{toJSON: {getters:true}})



const ProductModal = mongoose.models.Product || mongoose.model('Product',productSchema)

export default ProductModal