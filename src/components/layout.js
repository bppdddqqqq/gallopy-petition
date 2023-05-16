import React from 'react'

import Navigation from "./navigation";

import Footer from "./footer";




const Layout = ({children, className = "container mx-auto my-0 text-left"}, style) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className={className} style={{'flexGrow': '1'}}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout