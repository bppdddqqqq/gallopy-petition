import React from "react"
import { Link } from "gatsby"
import {RiArrowLeftSLine, RiSkullLine} from "react-icons/ri"

import Layout from "../components/layout"

const NotFound = () => (
  <Layout>
    <header className="block mb-12">
      <RiSkullLine style={{
        fontSize: "128px",
        color: "var(--primary-color)"
      }}/>
      <h1>Našel si lebku starého piráta!</h1>
      <p>Stránka nenalezena, 404</p>
    </header>
    <Link to="/" className="button"><RiArrowLeftSLine className="icon -left"/>Vrať mě pryč!</Link>
  </Layout>
)

export default NotFound