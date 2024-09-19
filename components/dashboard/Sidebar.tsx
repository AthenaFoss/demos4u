import Logo from '@/assets/Logo';
import { FileVideo2, Home, LayoutPanelTop, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-60 h-screen bg-stone-100  backdrop-blur-md text-black p-6 border-r shadow">
            <div className="font-semibold text-lg text-gray-800 mb-10">
                <Logo className='w-8 h-8'/>
            </div>
            <nav className="space-y-5 text-sm flex flex-col">
                <Link href="#" className=" py-2 text-white px-2 border flex items-center gap-2 rounded-md bg-stone-800">
                <Home className='w-4 h-4' />
                Dashboard
                </Link>
                <Link href="#" className="text-black/70 px-2  flex items-center gap-2">
                <FileVideo2 className='w-4 h-4 text-black/70' />
                My Library
                </Link>
                <Link href="#" className=" px-2 flex items-center gap-2 text-black/70">
                <LayoutPanelTop className='w-4 h-4 text-black/70' />
                Templates
                </Link>
                <Link href="#" className=" px-2 flex items-center gap-2 text-black/70">
                <Settings className='w-4 h-4 text-black/70' />
                Settings
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
// bg-[#F6F8FA] 