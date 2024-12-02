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

import {  z } from "zod"
 
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/CustomUi/ImageUpload'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '@/components/CustomUi/Delete';
import MultiText from '@/components/CustomUi/MultiText';
import MultiSelect from '@/components/CustomUi/MultiSelect';

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
  });



interface proFormPropsType {
  initialData?: productFormPropsType | null;
}

const ProductForm :React.FC<proFormPropsType> = ({initialData}) => {

  const [loading , setLoading ] = useState(false)

const router =useRouter();


  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

 
    try {
      setLoading(true);

const url = initialData ? `/api/products/${initialData._id}` : `/api/products`;

      const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(values)
      });

      if(res.ok){
        setLoading(false);
        toast.success(`Product ${ initialData ? "updated" : "created" } successfully`);
        router.push('/Products')
      }
    
      setLoading(false)
    } catch (error) {
      console.log("Error Product upload",error);
      setLoading(false);
      toast.error('Error creating Product');
    }



  };

// prevent submitting
const handleKeyPress =(e :React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {

if(e.key === 'Enter'){
  e.preventDefault();
}

}


// get collections for collections accordion selection
const [collections , setCollections ] = useState<CollectionType[]>([])
const getCollections_ = async () =>{
try {
  setLoading(true)
  const res = await fetch("/api/collection",{
    method: 'GET'
  })

const data = await res.json();
setCollections(data)


} catch (error) {
  console.log("Error getting collections",error);
  toast.error('Error getting collections, please try again');
}
setLoading(false)
}

// run get collections
useEffect(()=>{
    getCollections_()
},[])



  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        description: "",
        media: [],
        price: 0.1,
        expense: 0.1,
        colors:[],
        sizes:[],
        tags:[],
        category: '',
      collections :[],
    },
  });


  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        collections: initialData.collections.map((collection: any) => collection._id),
      });
    }
  }, [initialData]);


  return loading ? (
<div className="mt-52 justify-center flex items-center">
  <div  className='animate-spin bg-transparent w-14 h-14 border-t-sky-600 border-r-sky-600 border-2 border-transparent rounded-full '  />
</div>
  ) : (
    <div className='pb-10' >
{/* wrapper */}
<div className="py-4 px-5">

{/* title & seprator */}
<div>
{/* title */}

{
  initialData ? (
    <div className="flex justify-between items-center py-4">
  <p className='text-heading2-bold text-gray-600 ' >Edit Product</p>
<Delete item='product' collecId={initialData._id} />
    </div>
  ) :(
    <p className='text-heading2-bold text-gray-600 ' >Create Product</p>

  )
}

{/* seprator from shad */}
<Separator className="bg-grey-1 mt-4 mb-7" />
</div>

{/* form */}
<div className="">
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(urla) => field.onChange([...field.value , ...urla]) }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage  className="text-red-1" />
              </FormItem>
            )}
          />

{/* price & expense & categoty & tags */}
<div className="md:grid grid-cols-3 space-y-5">
 {/* price */}
 <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' onKeyDown={handleKeyPress} placeholder="expense" {...field} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />
         {/* expense */}
         <FormField
          control={form.control}
          name="expense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense</FormLabel>
              <FormControl>
                <Input type='number' onKeyDown={handleKeyPress} placeholder="expense" {...field} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />
         {/* Category */}
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input onKeyDown={handleKeyPress} placeholder="Category" {...field} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />


 {/* tags */}
 <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiText  placeholder="Tags" value={field.value}
                  onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      } onChange={(tag)=> field.onChange([...field.value, tag])} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />

 {/* Collections select */}
{
  collections.length > 0 && (
     <FormField
          control={form.control}
          name="collections"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collections</FormLabel>
              <FormControl>
                <MultiSelect  placeholder="Collections"
                 value={field.value}
                  onRemove={(idToRemovea) =>
                        field.onChange([
                          ...field.value.filter((_ida) => _ida !== idToRemovea),
                        ])
                      }
                      collections={collections}
                       onChange={(_id)=> field.onChange([...field.value, _id])} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />
  )
}



 {/* Colors */}
 <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <MultiText  placeholder="colors" value={field.value}
                  onRemove={(colorToRemove) =>
                        field.onChange([
                          ...field.value.filter((color) => color !== colorToRemove),
                        ])
                      } onChange={(color)=> field.onChange([...field.value, color])} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />




 {/* Sizes */}
 <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <MultiText  placeholder="Sizes" value={field.value}
                  onRemove={(sizeToRemove) =>
                        field.onChange([
                          ...field.value.filter((size) => size !== sizeToRemove),
                        ])
                      } onChange={(size)=> field.onChange([...field.value, size])} />
              </FormControl>
            
              <FormMessage className='text-red-1' />
            </FormItem>
          )}
        />



</div>










{/* functional buttons */}
<div className="flex gap-3 pb-20">
<Button className='bg-blue-1 text-white' type="submit">
  { loading ? (
  // loading spinner
  <div className='animate-spin bg-transparent w-4 h-4 border-t-white border border-transparent rounded-full ' />
) : initialData ? "Update"  :  "Submit"}</Button>
<Button className='bg-blue-1 text-white' onClick={()=> router.push("/Products")} type="button">Discard</Button>

</div>

      </form>
    </Form>
</div>
</div>

    </div>
  )
}

export default ProductForm