

import SalesRecharts from "@/components/CustomUi/SalesRecharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";






export default async function Home() {


  const totalSales = await getTotalSales().then((data) => data.totalSales);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();


  const graphData = await getSalesPerMonth();


  return (
    <div className="px-8 py-10 font-Roboto  ">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 ">
        {/* Card */}

        <Card className="" >
          <CardHeader className="flex text-neutral-600 text-[16px] font-bold fo md:text-[20px] lg:text-[24px] flex-row justify-between items-center " >
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
        
<CardContent>
  <p className="text-body-bold" >${totalSales}</p>
</CardContent>
        </Card>


        <Card className="" >
          <CardHeader className="flex text-neutral-600 text-[16px] font-bold fo md:text-[20px] lg:text-[24px] flex-row justify-between items-center " >
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
<CardContent>
  <p className="text-body-bold" >{totalOrders}</p>
</CardContent>
        </Card>

        <Card className="" >
          <CardHeader className="flex text-neutral-600 text-[16px] font-bold  md:text-[18px] lg:text-[22px] flex-row justify-between items-center " >
            <CardTitle>Total Customers</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
<CardContent>
  <p className="text-body-bold" >{totalCustomers}</p>
</CardContent>
        </Card>
      </div>



<Card className="mt-10" >
          <CardHeader className="flex text-neutral-600 text-[16px] font-bold  md:text-[18px] lg:text-[22px] " >
            <CardTitle>Sales Chart</CardTitle>
          
          </CardHeader>
<CardContent>
<SalesRecharts  data={graphData} />
</CardContent>
        </Card>

    </div>
  );
}
