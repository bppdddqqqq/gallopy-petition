import React from 'react'

import Navigation from "./navigation";

import Footer from "./footer";




const Layout = ({children, className = "container mx-auto my-0 text-left min-h-[80vh]"}) => {
  return (
    <main>
      <Navigation />
      <main className={className}>
        {children}
      </main>
      <Footer/>
    </main>
  )
}

export default Layout