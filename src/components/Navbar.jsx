import React from 'react'

const Navbar = () => {
    return (
        <div className='h-[70px] bg-green-950 text-2xl font-bold flex items-center justify-around '>
            <div className="logo  text-green-500">
                &lt;<span className="text-white">Pass</span><span >OP</span>/&gt;
            </div>
            <button className='flex items-center gap-2 text-lg border border-white rounded-full p-[4px] text-white'>
                <img  src="https://k-mahesh-babu.github.io/Password-Manager/assets/Gitlogo.svg" alt="" />
                <span>GitHub</span>
            </button>
        </div>
    )
}

export default Navbar
