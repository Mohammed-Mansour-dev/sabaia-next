
export const apiUrl =process.env.NEXT_PUBLIC_API_URL

export const getCollections_ = async ()=>{
const collections = await fetch(apiUrl + "/collection")
return await collections.json();

}



export const getCollection_ = async (collecId:string)=>{
const collection = await fetch(apiUrl + `/collection/${collecId}`)
 
 const data =await collection.json();
return data;


}



export const getProducts_ = async ()=>{
const products = await fetch(apiUrl + "/products")
return await products.json();

}

export const getProduct_ = async (id:string)=>{
const products = await fetch(apiUrl + `/products/${id}`)
return await products.json();

}
// get search products
export const getSearchProducts =async (query:string)=>{
    const res = await fetch(`${apiUrl}/search/${query}`)
   
return  await res.json();
}



export const getOrders_ =async (cusId:string)=>{
    const res = await fetch(`${apiUrl}/orders/customerOrder/${cusId}`)
return await res.json();
}


export const getRelatedProducts_ =async (proId:string)=>{
    const res = await fetch(`${apiUrl}/products/${proId}/related`)
    return await res.json();
}



