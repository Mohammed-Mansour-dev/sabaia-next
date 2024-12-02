import CustomerModal from "../models/Customer";
import OrderModal from "../models/Order";
import { connectDB } from "../MongoDB"




export const getTotalSales = async ()=>{
await connectDB();
const orders = await OrderModal.find();
const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
const totalOrders =orders.length;
return {totalSales ,totalOrders}
}

export const getTotalCustomers = async ()=>{
    await connectDB();
    const customers = await CustomerModal.find();
    const totalCustomers = customers.length;
    return totalCustomers
};


export const getSalesPerMonth = async ()=>{
await connectDB();
const orders =await OrderModal.find();

const salesPerMonth = orders.reduce((acc, order) => {

    const monthIndex = new Date(order.createdAt).getMonth() ;
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    
    return acc
}, {});


const graphData =Array.from({length:12},(_, i) => {
    const month =Intl.DateTimeFormat("en-US",{month:"short"}).format(new Date(0, i));
    return {name:month, sales:salesPerMonth[i] || 0 }
})

return graphData
}


