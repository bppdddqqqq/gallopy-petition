import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"

export const pageQuery = graphql`
  query AktualityQuery {
		site {
      siteMetadata {
        siteTitle: title
      }
    }
  }
`
const AktualityPage = ({ data }) => {

	return (
		<Layout>
			<div className="mx-auto my-0 mt-8 max-w-3xl">
				<h1>Todo: make aktuality great again (MAGA)</h1>
			</div>
		</Layout>
	)
}

export const Head = () => (
  <SEO />
)

export default AktualityPage