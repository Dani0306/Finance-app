"use client";

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { MdDashboard, MdAttachMoney, MdSavings, MdMoney } from "react-icons/md";
import { IoStatsChart, IoSettingsSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import Link from 'next/link';



const Navbar = () => {

  const [show, setShow] = useState(false)

  const handleNavbar = () => {
    setShow(!show)
  }

  return (
    <nav className="w-[100px] h-screen mx-auto absolute left-0 top-0 z-[100] flex flex-col">
      {show && <div onClick={() => setShow(false)} className='w-screen h-screen bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 z-[200]'></div>}
      <button onClick={handleNavbar} className="z-[300] lg:hidden mt-4 ml-3 w-[50%] h-[60px] bg-[#3f4848] rounded-full flex flex-col items-center justify-center">
        <div className={`w-[20px] h-[2px] bg-white my-[2px] transition-all duration-500 ${show && "openButton1"}`}></div>
        <div className={`w-[20px] h-[2px] bg-white my-[2px] transition-all duration-500 ${show && "opacity-0"}`}></div>
        <div className={`w-[20px] h-[2px] bg-white my-[2px] transition-all duration-500 ${show && "openButton2"}`}></div>
      </button>
      <ul className={cn("flex z-[300] mt-[70px] w-full h-full flex-col lg:left-0 items-center justify-start relative transition-all duration-500", show ? "left-0" : "left-[-100px]")}>
          {/* <li className='w-[70%] h-[70px] bg-[#3f4848] rounded-full mb-12'>
            <img className='w-full h-full rounded-full object-cover' src="/logo.png" alt="" />
          </li> */}
          <li className='w-[65%] h-[65px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center hover:scale-[1.08] transition-all duration-500'>
              <Link href="/dashboard">
                <MdDashboard className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
              </Link>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
            <Link href="/transactionshistory">
              <GrTransaction className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
            </Link>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
              <MdSavings className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
              <Link href="/reports">
                <IoStatsChart className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
              </Link>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
              <IoSettingsSharp className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
              <FaChartPie className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
          </li>
          <li className='w-[65%] h-[65px] md:w-[70%] md:h-[70px] bg-[#3f4848] rounded-full mt-[-15px] flex items-center justify-center md:hover:scale-[1.08] transition-all duration-500'>
              <TbLogout2 className='text-white w-6 h-6 md:w-7 md:h-7 hover'/>
          </li>
      </ul>
    </nav>
  )
}

export default Navbar