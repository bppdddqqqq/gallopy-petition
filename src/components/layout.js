import React from 'react'
// import { useStaticQuery, graphql } from "gatsby"

import Navigation from "./navigation";

import Footer from "./footer";


// const query = graphql`
// query LayoutQuery {
//   site {
//     siteMetadata {
//       siteTitle: title
//     }
//   }
// }
// `

const Layout = ({children, className = "container mx-auto my-0 text-left min-h-[80vh]"}) => {

  // const { site } = useStaticQuery(query)
  // const { siteTitle } = site.siteMetadata

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