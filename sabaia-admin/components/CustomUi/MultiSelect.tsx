"use client"
import React, { useState } from 'react'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

import { X } from 'lucide-react';




interface propsType {
    value:string[];
    onChange: (value: string) => void;
onRemove: (value: string) => void;
placeholder: string;
 collections: CollectionType[];
}


const MultiSelect :React.FC<propsType> =({
    value,
    onChange,
    onRemove,
    placeholder,
    collections,
  
}) => {
const [inpVal , setInpVal ] = useState("")
const [opena , setOpena ] = useState(false)

let selected :CollectionType[]

if(value.length > 0) {
  selected = value.map(id => collections.find(c => c._id === id)) as CollectionType[]
}else {
  selected = [];
}



const selectables = collections.filter(collection =>  !selected.includes(collection));


 return(



    <Command className='bg-white  h-fit border overflow-visible' >

{/* selected ones */}
<div className=" flex  flex-wrap gap-1 rounded-md">
  {
    selected.map((item, index) => (
      <div className='px-2 py-1 flex items-center justify-center ' key={item._id} >
          { item.title}
           <button onClick={()=>onRemove(item._id)} className="" >
   
       <X size={15} className='hover:text-red-500 mt-1' />
       </button>
      </div>
    ))
  }
</div>
{/* select input */}
    <CommandInput
     placeholder={placeholder} 
     value={inpVal}
     onValueChange={setInpVal}
     onBlur={()=> setOpena(false)}
     onFocus={()=> setOpena(true)}
     className='!h-10'
     />


{/* choises */}
 <div className=' overflow-visible relative z-10  ' >

 { 
 opena && (  <CommandList className='absolute top-0 bg-white 
border shadow-md overflow-auto
rounded-md
 w-full' >
    <CommandGroup >
    {
      selectables.map((collection )=>(
<CommandItem     key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInpVal("");
                }}
                className="hover:bg-grey-2 cursor-pointer" >
{collection.title}
</CommandItem>
      ))
    }
    </CommandGroup>
  </CommandList>)
}
  </div>




   
  </Command>
  
  )
}

export default MultiSelect