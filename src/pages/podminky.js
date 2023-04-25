import React from 'react';
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import TermsText from '../content/terms.mdx'

export const pageQuery = graphql`
  query PodepsaliQuery {
		site {
      siteMetadata {
        siteTitle: title
      }
    }
  }
`
const PodepsaliPage = ({ data }) => {

	// console.log(pages)
	return (
		<Layout>
			<div className="mx-auto my-0 mt-8 max-w-6xl">
        <h1>Podmínky</h1>
        <TermsText />
      </div>
		</Layout>
	)
}

export const Head = () => (
  <SEO />
)

export default PodepsaliPage