// "use client"


// import Image from 'next/image'
// import React, { useState } from 'react'

// const Gallery = ({media}:{media:[string]}) => {

// const [mainImg, setMainImg] = useState(media[0])



//   return (
//     <div>
        
// {/* main img */}
// <div className="">
//     <Image className="w-96 h-[60vh] shrink-0 object-cover"
//     width={800}
//     height={800}
//      src={mainImg} alt="Gallery" />
// </div>

// {/* media qeue */}
// <div className="flex gap-2 overflow-auto scrollbar-hide ">
//     {
//         media.map((img)=>(
// <div key={img} className="pt-2  shrink-0 ">
//     <Image 
//     onMouseOver={()=>setMainImg(img)}
//     className={`w-28 h-28 object-cover shrink-0 rounded-xl ${mainImg === img && "p-0.5 border-2 border-black"} `}
//     width={80}
//     height={80}
//      src={img} alt="Gallery" />
// </div>
//         ))
//     }
// </div>

//     </div>
//   )
// }

// export default Gallery



"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ media }: { media: [string] }) => {
  const [mainImg, setMainImg] = useState(media[0]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  return (
    <div>
      {/* Main Image */}
      <div className="">
        <Image
          className="w-96 h-[60vh] shrink-0 object-cover cursor-pointer"
          width={800}
          height={800}
          src={mainImg}
          alt="Gallery"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        />
      </div>

      {/* Media Queue */}
      <div className="flex gap-2 overflow-auto scrollbar-hide">
        {media.map((img) => (
          <div key={img} className="pt-2 shrink-0">
            <Image
              onMouseOver={() => setMainImg(img)}
              className={`w-28 h-28 object-cover shrink-0 rounded-xl ${
                mainImg === img && "p-0.5 border-2 border-black"
              }`}
              width={80}
              height={80}
              src={img}
              alt="Gallery Thumbnail"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          {/* Close Icon */}
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            ×
          </button>
          {/* Full-Screen Image */}
          <Image
            className="object-contain rounded-md"
            width={800}
            height={800}
            src={mainImg}
            alt="Full-Screen Gallery"
            style={{ width: "90vh", height: "80vh" }}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
