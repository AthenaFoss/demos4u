import Logo from '@/assets/Logo'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='lg:max-w-[1200px] px-3 py-8 md:max-w-[800px] max-w-[400px] mx-auto sticky'>
      <nav className='flex items-center justify-between'>
        <Link href="/" className='flex items-center'>
          <Logo className='w-6 h-6'/>
          <h1 className='font-bold text-lg'>demos4u</h1>
        </Link>
        {/* <div className='gap-6 text-sm items-center font-medium hidden md:flex'>
          <Link href="#">
            Product
          </Link>
          <Link href="#">
            Blog
          </Link>
          <Link href="#">
            Pricing
          </Link>
          <Link href="#">
            Contact
          </Link>
        </div> */}
        <div className='flex items-center gap-4'>
          <Link href="#" className='text-sm hover:underline font-semibold'>
            Login
          </Link>
          <Button>
          <Link href="#">
            Start for free
          </Link>
          </Button>

        </div>
      </nav>
    </header>
  )
}

export default Header