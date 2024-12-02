import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



interface cartItemType {
    item:ProductType;
    quantity: number;
    color: string;
    size:string;
}

interface cartStoreType {
    cartItems: cartItemType[];
    addItem:(item:cartItemType) => void;
    removeItem:(_idRe:string) => void;
    increaseQuantity:(_idIn:string) => void;
    decreaseQuantity:(_idDe:string) => void;
    clearCart:() => void;
}



export const useCart =create(persist<cartStoreType>(
    (set,get) => ({
        cartItems: [],
        addItem:(data:cartItemType)=>{
            const {item,quantity,color,size} = data;
            const currentItems =get().cartItems;
       const existingItem = currentItems.find((itema) => itema.item._id === item._id);

       if (existingItem){
        return toast("Product already added",{icon:"🛒"})
       }

       set({cartItems:[...currentItems, {item, quantity, color, size}]})
       toast("Product Added successfully to cart",{icon:"🛒"})

        },
        removeItem:(_idRe:string)=>{
            const newItems = get().cartItems.filter(item => item.item._id !== _idRe);
            set({cartItems:newItems})
            toast("Product removed from cart",{icon:"🛒"})
        },
        increaseQuantity:(_idIn:string)=>{
const newItems =get().cartItems.map(itema => itema.item._id === _idIn ?
    {...itema, quantity: itema.quantity < 20 ? itema.quantity + 1 : itema.quantity} : itema
) ;
set({cartItems:newItems})
},
        decreaseQuantity:(_idDe:string)=>{
const newItems =get().cartItems.map(itema => itema.item._id === _idDe ?
    {...itema, quantity: itema.quantity > 1 ? itema.quantity - 1 : itema.quantity} : itema
);
set({cartItems:newItems});
},

clearCart :()=> set({cartItems:[]})

    }),{name:"cart",storage:createJSONStorage(()=> localStorage)}
))




































// import toast from "react-hot-toast";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";


// interface CartItemType {
//     item:ProductType;
//     quantity: number;
//     size?: string;
//     color?: string;
// }


// interface CartStoreType {
//     cartItems: CartItemType[];
//     addItem:(item:CartItemType) => void
// }


// export const useCart =create(
//     persist<CartStoreType>(
//     (set ,get)=>({
//         cartItems:[],
//         addItem:(data:CartItemType)=>{
// const {item,quantity,color,size} =data;
// const currentItems = get().cartItems
// const existingItem =currentItems.find((itema)=> itema.item._id === item._id)

// if(existingItem) return toast("item already added",{icon:"🛒"})

//     set({cartItems:[...currentItems ,{item, quantity ,color ,size}]})

//         }

//     }),{name: 'Cart',
//         storage:createJSONStorage(()=>localStorage)
//     }
// ))

