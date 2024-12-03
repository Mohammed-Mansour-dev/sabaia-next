"use client"

import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
const [imgs , setImgs ] = useState<string[]>([])



const onUploada = (result:any) => {
  // Only update `imgs`, and let `useEffect` handle `onChange`
  setImgs((prevImgs:string[]) => [...prevImgs, result.info.secure_url]);
  onChange(imgs);

};

useEffect(
  () => {
    onChange(imgs);
  },
  [imgs]
)


  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url,index) => (
          <div key={index} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
            priority
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
              sizes="200px,200px"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="t0rewxmw" onSuccess={onUploada}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-grey-1 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;