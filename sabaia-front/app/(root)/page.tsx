import Collections from "@/components/Collections";
import ProductsSection from "@/components/ProductsSection";
import { getCollections_ } from "@/lib/actions/actions";
import Image from "next/image";


 const  Home = async () => {




  return (
  <div className="pb-20">
   
   {/* banner image */}
<div className="w-full">
  <Image className="mx-auto w-full max-h-screen " priority src="/banner.jpg" width={1000} alt="Banner" height={1500}   />
</div>

{/* collections */}
<Collections />

{/* products */}
<ProductsSection />

  </div>
  );
}

export default Home
export const dynamic = "force-dynamic";