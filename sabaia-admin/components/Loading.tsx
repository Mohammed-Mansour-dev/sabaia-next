import React from 'react'

const Loading = () => {
  return (
    <div className='relative w-full h-screen font-Roboto ' >
        <div className="wrap absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2  ">
  <div className="loading">
    <div className="bounceball relative inline-block h-[37px] w-[15px] before:absolute before:content-[''] before:block before:w-[15px] before:h-[15px] before:bg-sky-700 before:origin-[50%] before:animate-[bouncea_500ms_alternate_infinite_ease] before:rounded-[50%] before:top-0;
 "></div>
    <div className="text text-sky-800 font-semibold text-xl inline-block ml-1 ">NOW LOADING...</div>
  </div>
</div>
    </div>
  )
}

export default Loading