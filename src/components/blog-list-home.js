import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import { RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>Náš <strong>program</strong></h2>
    <div className="grids col-1 sm-2 lg-3">
      {data}
    </div>
    <Link 
      className="button" 
      to="/program"
      sx={{
        variant: 'links.button'
      }}
    >
      Více<span className="icon -right"><RiArrowRightSLine/></span>
    </Link>
  </section>
)

export default function BlogListHome() {
  return (
    <StaticQuery 
      query={graphql`
        query {
          allMdx(
            filter: { frontmatter: { template: { eq: "blog-post" } } }
            limit: 6
          ) {
            edges {
              node {
                id
                frontmatter {
                  slug
                  title
                  
                }
              }
            }
          }
        }`
      }
      /*
childImageSharp {
                      fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                        ...GatsbyImageSharpFluid
                        ...GatsbyImageSharpFluidLimitPresentationSize
                      }
                    }
      */

      render={ data => {
          const posts = data.allMdx.edges
            .filter(edge => !!edge.node.frontmatter.date)
            .map(edge =>
              <PostCard key={edge.node.id} data={edge.node} />
          )
          return <PostMaker data={posts} />
        } 
      }
    />
  )
}