import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

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

export const Head = ({ data }) => {
  const { site } = data
  const { siteTitle } = site.siteMetadata

  return (<>
    <title>{siteTitle}</title>
  </>)
}

export default AktualityPage