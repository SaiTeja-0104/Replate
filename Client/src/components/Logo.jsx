import React from 'react'
import logo from '../assets/replate.png'

const Logo = () => {
  return (
    <div className='font-pop cursor-default'>
        <div className='flex items-center gap-1 '>
              <img src={logo} width='50px' alt="" />
              <p className='text-3xl text-[#333333] pt-[2px] font-bold'>RePlate</p>
        </div>
    </div>
  )
}

export default Logo
