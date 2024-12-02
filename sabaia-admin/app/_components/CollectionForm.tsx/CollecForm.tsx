"use client";

import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod"
 
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/CustomUi/ImageUpload'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '@/components/CustomUi/Delete';

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(200).trim(),
  image: z.string()
});



interface collecFormPropsType {
  initialData?: CollectionType | null;
}

const CollecForm :React.FC<collecFormPropsType> = ({initialData}) => {

  const [loading , setLoading ] = useState(false)

const router =useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: ""
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

 
    try {
      setLoading(true);

const url = initialData ? `/api/collection/${initialData._id}` : `/api/collection`;

      const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(values)
      });

      if(res.ok){
        setLoading(false);
        toast.success(`Collection ${ initialData ? "updated" : "created" } successfully`);
        router.push('/Collections')
      }
      
      setLoading(false)
    } catch (error) {
      console.log("Error collection upload",error);
      setLoading(false);
      toast.error('Error creating collection');
    }



  };


const handleKeyPress =(e :React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {

if(e.key === 'Enter'){
  e.preventDefault();
}

}


useEffect(() => {
  if (initialData) {
    form.reset({
      ...initialData,
    });
  }
}, [initialData]);

  return loading ? (
    <div className="">
    <div className="mt-52 justify-center flex items-center">
  <div  className='animate-spin bg-transparent w-14 h-14
   border-t-sky-600 border-r-sky-600 border-2 border-transparent 
   rounded-full '  />
</div>
    </div>
  ) : (
    <div>
{/* wrapper */}
<div className="py-4 px-5 pb-20">

{/* title & seprator */}
<div>
{/* title */}

{
  initialData ? (
    <div className="flex justify-between items-center py-4">
  <p className='text-heading2-bold text-gray-600 ' >Edit Collection</p>
<Delete item='collection' collecId={initialData._id} />
    </div>
  ) :(
    <p className='text-heading2-bold text-gray-600 ' >Create Collection</p>

  )
}

{/* seprator from shad */}
<Separator className="bg-grey-1 mt-4 mb-7" />
</div>

{/* form */}
<div className="">
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
       {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input onKeyDown={handleKeyPress} placeholder="title" {...field} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />

       {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea onKeyDown={handleKeyPress} placeholder='description' {...field} rows={5 } />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />

       {/* image upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image  </FormLabel>
              <FormControl>
<ImageUpload value={field.value ? [field.value] : [] }
 onChange={(url) => field.onChange(...url)}
 onRemove={()=> field.onChange("") }
  />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />

{/* functional buttons */}
<div className="flex gap-3">
<Button className='bg-blue-1 text-white' type="submit">
  { loading ? (
  // loading spinner
  <div className='animate-spin bg-transparent w-4 h-4 border-t-white border border-transparent rounded-full ' />
) : initialData ? "Update"  :  "Submit"}</Button>
<Button className='bg-blue-1 text-white' onClick={()=> router.push("/Collections")} type="button">Discard</Button>

</div>

      </form>
    </Form>
</div>
</div>






    </div>
  )
}

export default CollecForm