import mongoose from "mongoose";



const orderSchema =new mongoose.Schema({
    customerClerkId: String,
    products:[
      {
      product : { type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
   
    color:String,
    size:String,
    quantity: Number
     },],
     
     shippingAddress: {
      type: {
         street: { type: String },
         city: { type: String },
         state: { type: String },
         postalCode: { type: String },
         country: { type: String },
      },
      required: true, // Optional: Add if you want this field to be mandatory
   },
     shippingRate:{type:String},
     totalAmount: Number,
     createdAt:{
        type: Date,
        default: Date.now
     }


})


const OrderModal = mongoose.models.Order || mongoose.model('Order',orderSchema);



export default OrderModal


