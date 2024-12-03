
type CollectionType ={
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
}


type productFormPropsType = {
  _id: string,
    title: string,
  description:string,
  media: [string],
  price:number ,
  expense:number,
  colors: [string],
  sizes: [string],
  tags:[string],
  category:string,
collections : [string],
  createdAt : Date,
  updatedAt: Date,
}
interface ProTypeWithCollec {
  _id: string;
  title: string;
  description: string;
  media: [string];
  price: number;
  expense: number;
  colors: [string];
  sizes: [string];
  tags: [string];
  category: string;
  collections: CollectionType[] ;
  createdAt: Date;
  updatedAt: Date;
}



type OrderItemType ={
  product:productFormPropsType;
  color:string;
  size: string;
  quantity: number;
}


type CustomerType ={
  clerkId:string;
  name: string;
  email: string;
}


type GraphDataType ={
  name:string;
  sales:number;
}





