/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"


import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";
import Theme from "../components/theme"


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
      <Header>
        <div className="flex-row">
          <Logo title={siteTitle} />
          <Navigation />
        </div>
        <div sx={layoutStyle.theme}>
          <Theme/>
        </div>
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout

const layoutStyle = {
  theme: {
    display:["none", "none", "none", "block"],
  }
}