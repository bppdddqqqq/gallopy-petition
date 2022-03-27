import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!){
		mdx(id: { eq: $id }) {
      id
			excerpt
			body
      frontmatter {
        title
      }
    }
  }
`
const AboutPage = ({ data }) => {
	const { mdx } = data // data.mdx holds your post data
  const { frontmatter, body, excerpt } = mdx

	return (
		<Layout>
			<Seo
				title={frontmatter.title}
				description={excerpt}
			/>
			<div className="wrapper">
				<h1>{frontmatter.title}</h1>
				<MDXRenderer article>{body}</MDXRenderer>
			</div>
		</Layout>
	)
}

export default AboutPage