// import React from 'react'
// import hero from '../assets/hero2.png'

// const Hero = () => {
//   return (
//     <div>
//       <div className='min-h-[calc(100vh-115px)] md:pt-10  sm:mb-10 flex flex-col sm:flex-row sm:gap-15 max-w-[83%] mx-auto items-center justify-center'>
//         <div className='flex pb-10 sm:pb-32 text-center sm:text-left justify-center flex-col'>
//             <div className='text-4xl font-pop sm:text-5xl md:text-6xl font-bold '>Reduce <p>Food Waste</p></div>
//             <div className='text-[#333333] text-xl md:text-2xl font-inter pt-3'>Discover how you can make a difference by connceting
//             <p>with local organizations to donate surplus food.</p></div>
//             <div className='font-pop font-semibold flex flex-col sm:flex-row gap-5 pt-10 '>
//                 <button className='border border-[#e39b6b] bg-[#e39b6b]  hover:border-[#FF7043] text-white hover:bg-[#FF7043] rounded-lg px-5 py-2 cursor-pointer'>Donate Now</button>
//                 <button className='border border-black text-black rounded-lg px-5 py-2 cursor-pointer  hover:text-black bg-[#FAFAFA] hover:bg-[#fffaee]'>Request Food</button>
//              </div>
//         </div>
//         <div className='max-w-[600px] z-0'>
//             <img className='w-full  object-cover' src={hero} alt="" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero


import { useContext } from "react";
import hero from "../assets/hero2.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const Hero = () => {
  const {token,userData} = useContext(UserContext);
  return (
    <section className="bg-[#fffaee]">
      <div className="min-h-[calc(100vh-90px)] max-w-[85%] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-16">

        {/* Text */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold font-pop leading-tight text-[#2E2E2E]">
            Reduce Food Waste.
            <span className="block  text-[#FF7043]">Feed More Lives.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mt-6">
            Replate connects surplus food donors with NGOs and volunteers
            to ensure no food goes to waste while people go hungry.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={ (token && userData.role === "donor") ? "/donor/profile" : "/register" }>
              <button className="px-6 py-3 rounded-lg bg-[#FF7043] text-white font-semibold hover:bg-[#F4511E] transition cursor-pointer">
                Donate Food
              </button>
            </Link>

            <Link to={(token && userData.role === "ngo") ? "/ngo/profile" : "/register"}>
              <button className="px-6 py-3 rounded-lg border border-[#FF7043] text-[#FF7043] font-semibold hover:bg-[#FFF3E0] transition cursor-pointer">
                Request Food
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="max-w-[520px]">
          <img src={hero} alt="Food Donation" className="w-full drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;



