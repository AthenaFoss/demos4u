import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className='mt-20 flex flex-col items-center justify-center px-4'>
            <h1 className='md:text-6xl text-3xl text-center font-bold tracking-tighter'>
                Create Professional Screen <br /> Recordings for Free
            </h1>
            <p className='mt-5 text-center text-sm md:text-base font-medium text-black/60'>
                Capture, Customize, and Share <br /> All Free, All Powerful. Start Creating Now
            </p>
            <div className='mt-5 flex gap-4 items-center justify-center'>
                <Link href="/dashboard" className='bg-[#d6eafc] rounded-md px-3 pl-1 border border-black/10 py-1 flex items-center gap-2'>
                    <span className='bg-white rounded-md text-center px-3 py-1'>
                        <ArrowRight className='text-black/60'/>
                    </span>
                    Get started For Free
                </Link>
            </div>
            <div className="mt-16 p-2 border border-black/10 rounded-xl max-w-[1400px] mx-auto">
                <div className='p-2 bg-[#DEEEFF] rounded-xl'>
                    <div className='bg-blue-50 rounded-xl'>
                        <Image 
                            src="/hero.png"
                            width={1200}
                            height={600}
                            alt='hero'
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
