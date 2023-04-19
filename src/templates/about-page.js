import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

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
const AboutPage = ({ data, children }) => {
	const { mdx } = data // data.mdx holds your post data
  const { frontmatter, body } = mdx

	return (
		<Layout>
			<div className="mx-auto my-0 mt-8 max-w-3xl">
				<h1>{frontmatter.title}</h1>
				{children}
			</div>
		</Layout>
	)
}

export default AboutPage