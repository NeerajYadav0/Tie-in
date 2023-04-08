import React from 'react';
import { useState } from 'react';
import {HiMenu } from "react-icons/hi";
import {HiX} from "react-icons/hi"




function Navbar(props) {
    let Links =[
        {name:"HOME",link:"/"},
        {name:"ABOUT",link:"/"},
        {name:"HACKATHON",link:"/"},
        {name:"INTERNSHIP",link:"/"},
        {name:"JOB",link:"/"},
      ];
    let [open,setOpen]=useState(false);
  return (
  <div className='shadow-md w-full fixed top-0 left-0 '>
    < div className='md:flex py-4 items-center justify-between md:px-10 px-7'>
    <div className='font-bold text-2xl cursor-pointer flex items-center'>
        Tie-in
    </div>
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
   { open?<HiX />:<HiMenu />}

    </div>
    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static left-0 w-full md:w-auto md:pl-0 pl-9 duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
    {
          Links.map((link)=>(
             <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className=' hover:text-[#e668b3] duration-500'>{link.name}</a>
            </li>
          ))
        }
            
       
    </ul>
   </div>
    </div> 
   
 
  

    
 
  );
}

export default Navbar;