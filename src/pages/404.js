import React from "react"
import { Link } from "gatsby"
import {RiArrowLeftSLine, RiSkullLine} from "react-icons/ri"

import Seo from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout className="not-found-page">
    <Seo title="Page not found"/>
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <header>
        <RiSkullLine style={{
          fontSize: "128px",
          color: "var(--primary-color)"
        }}/>
        <h1>Našel si lebku starého piráta!</h1>
        <p>Ale né, jenom si narazil na neexistující stránku. Aneb 404 :(</p>
      </header>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left"/>Vrať mě pryč!</Link>
    </div>
  </Layout>
)

export default NotFound