import React from 'react'
import BlurText from './BlurText'
import Link from 'next/link'

const WelcomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/back.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <BlurText
          text="Welcome"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-7xl font-extrabold text-white mb-8"
        />
        <button className='w-[250px] h-[40px] bg-black flex items-center justify-center rounded-xl opacity-0 translate-y-[50px] ani border text-white border-white'>
          <span className='text-white text-sm'>
            <Link href="/dashboard"><span className='mr-3'>Go to dashboard </span> &rarr;</Link>
          </span>
          
        </button>
      </div>

      <div className="absolute inset-0 bg-black opacity-80 z-0" />
    </div>
  )
}

export default WelcomePage