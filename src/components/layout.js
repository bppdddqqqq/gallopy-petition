import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";


const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteTitle: title
    }
  }
}
`

const Layout = ({children, className = "container mx-auto my-0 text-left min-h-[80vh]", props = {}}) => {

  const { site } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata
  const { pre = (<div/>) } = props

  return (
    <div className="primary-container">
      { pre }
      <Navigation />
      <main className={className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout