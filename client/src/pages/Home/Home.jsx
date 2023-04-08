import React from 'react';
import { useEffect } from 'react';
import "./Home.css";
import Typed from 'typed.js';
import {MdSignalWifi4Bar} from "react-icons/md";
import {FaPlay} from "react-icons/fa";
import Navbar from '../NavBar';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function Home() {
  useEffect(()=>{
    var mySwiper = new Swiper(ele.current, {
      loop: false,
      speed: 1000,
      autoplay: {
          delay: 1000,
      },
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
      },
  
      
  
  })
    const typeData = new Typed(el.current, {
      strings: [
        "Hackathon.",
        "Job.",
        "Internship.",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });
  },[]);
  const el = React.useRef(null);
  const ele = React.useRef(null);
  
    
      
  return (
    <div className='h-[100%] bg-[#e7e9f6] z-[-1]'> 
    <Navbar></Navbar>
    <div className='w-[60%] mx-auto h-[100%] relative homeBg pt-10'>
        <div className='absolute w-full'> 
        <MdSignalWifi4Bar className='xl:block hidden text-5xl text-[#8055C9] mt-[70px] rotate-[45deg] z-[-1]'/> 
         <FaPlay className=' xl:block  hidden text-5xl text-[#e668b3] mt-[230px] rotate-[-20deg] ml-[95%] z-[-1]'/> 
        </div>
        <div className="pt-[10%] font-serif font-bold text-[#343f52]">
            <div className='text-[45px] text-center '>Empowering your career with real-world experience<br></br>
            <div className='text-[30px] pt-4 text-[#]'>Unlock Your Potential with-<br></br></div>
            {/* <ReactTextRotator content={content} time={5000}  /> */}
            <span className='text-[#8055C9]' ref={el}></span>
            </div>
            <div className='mt-10 text-xl text-center text-[#7b8191]'>Explore Your Possibilities: Your Gateway Future Awaits Here</div>
            <div className='flex justify-evenly mt-10'>
              <button className='shadow-lg h-[50px] w-[100px] rounded-xl text-white transition ease-in-out delay-150 bg-[#8055C9]  hover:scale-110 duration-400 '>Login</button>
              <button className=' shadow-lg h-[50px] w-[100px] rounded-xl text-white transition ease-in-out delay-150 bg-[#e668b3]  hover:scale-110 duration-400'>Register</button>
            </div>
        </div>
        <div className='mx-auto'>
        <div class="swiper-container" ref={ele}>
        <div class="swiper-wrapper">
        <div class="swiper-slide w-auto">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt=""/>
        </div>
        <div class="swiper-slide">
            <img src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" alt=""/>
        </div>
        <div class="swiper-slide">
            <img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt=""/>
        </div>
    </div>
</div>
        </div>
    </div>
    </div>
  )
}
