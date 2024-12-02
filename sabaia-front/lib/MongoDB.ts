import mongoose from "mongoose";


let isConnected = false;

export const ConnectDB = async ()=>{

if(isConnected){
    console.log("DB is already connected");
    return;
}

try {
    
await mongoose.connect(process.env.MONGODB_URL || "" ,{
    dbName:"sabaia_front"
})

isConnected = true;

console.log("DB is connected");


} catch (error) {
    console.log("connection DB error",error);

}


}
















