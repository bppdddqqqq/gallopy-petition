/** @jsx jsx */
import { jsx } from "theme-ui"
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

const Layout = ({children, className, props = {}}) => {

  const { site } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata
  const { pre = (<div/>) } = props

  return (
    <div className="primary-container">
      { pre }
      <Navigation />
      <main className={"container mx-auto text-left my-0 min-h-[80vh] " + className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout