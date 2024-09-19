import Sidebar from '@/components/dashboard/Sidebar'
import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/getSession'
import { ArrowBigDownDash, CloudDownload, Disc } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async () => {
  const session = await getSession()
  if (!session?.user) redirect('/auth/signin')
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <Link href="/record">
          <Button className="gap-1"><Disc className='w-4 h-4' /> Record video</Button>
          </Link>
        </div>
        <section>
          <div className='border w-fit px-4 py-1 rounded-md bg-stone-100 flex items-center justify-center gap-1'>
            <h1 className='font-semibold text-center'>Recordings</h1>
            <ArrowBigDownDash className='w-5 h-5 text-center' />
          </div>
          <div className='mt-10'>
              <div className='grid lg:grid-cols-5 md:grid-cols-2 gap-6 '>
                <div className='flex flex-col max-w-80 border px-2 py-2 rounded-md bg-stone-100'>
                  <div className='bg-gray-200 rounded-md h-40'></div>
                  <div className='flex mt-5 justify-between items-center'>
                    <h2 className='text-sm font-medium text-gray-700'>Video 1</h2>
                    <p className='text-xs text-gray-500'>10 minutes ago</p>
                  </div>
                  <div className='mt-5 '>
                  
                  <p className='text-sm bg-stone-50 px-2 py-1 rounded-md border shadow-inner flex items-center gap-1 w-fit'>Download <CloudDownload className='w-3 h-3' /></p>
                  </div>
                </div>
                <div className='flex flex-col max-w-80 border px-2 py-2 rounded-md bg-stone-100'>
                  <div className='bg-gray-200 rounded-md h-40'></div>
                  <div className='flex mt-5 justify-between items-center'>
                    <h2 className='text-sm font-medium text-gray-700'>Video 1</h2>
                    <p className='text-xs text-gray-500'>10 minutes ago</p>
                  </div>
                  <div className='mt-5 '>
                  
                  <p className='text-sm bg-stone-50 px-2 py-1 rounded-md border shadow-inner flex items-center gap-1 w-fit'>Download <CloudDownload className='w-3 h-3' /></p>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard