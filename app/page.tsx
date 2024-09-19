import Header from '@/components/layout/Header'
import React from 'react'
import GridBackground from '@/components/ui/grid-background'
import Hero from '@/components/ui/hero'

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <GridBackground />
      <div className="relative z-10">
        <Header/>
        {/* Your other content goes here */}
        <Hero/>
      </div>
    </div>
  )
}

export default Home