import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface MultiTextPropsType {
    value: string[],
    placeholder: string, 
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
}


const MultiText :React.FC<MultiTextPropsType> = ({
    value,
    placeholder,
    onChange,
    onRemove,
 }) => {

const [inputValue , setInputValue ] = useState("")

const addTag = (item:string)=>{

  if(!item){
    toast.error("Input cann't be empty")
    return;
  }

onChange(item);
    setInputValue("");
}


  return (
    <>
        <Input 
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={(e)=>{
            if (e.key === "Enter") {
                e.preventDefault()
                addTag(inputValue)
            }
        }}
        />

{/* added ones */}
<div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1
          flex py-1 px-4 items-center text-[.92rem] text-white">
            {item}
            <button
              className="ml-1 rounded-full
               outline-none hover:bg-red-1"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>


    </>
  )
}

export default MultiText