import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='bottom-0 sticky w-full h-[70px] bg-green-950 flex flex-col gap-2 items-center justify-center'>
        <div className="logo text-2xl font-bold  text-green-500">
          &lt;<span className="text-white">Pass</span><span>OP</span>/&gt;
        </div>
        <div className='text-white font-semibold'>
          Created With ❤️ By Mahesh3.2 🗿
        </div>
      </div>
    </>
  )
}

export default Footer