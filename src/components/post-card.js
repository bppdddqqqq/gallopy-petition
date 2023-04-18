import React from 'react'
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostCard = ({ data }) => (
  <article 
    className="post-card"
    sx={{
      bg: 'cardBg'
    }}
  >
    {data.frontmatter.featuredImage ? 
      (
        <Link to={data.frontmatter.slug}>
          <Img 
            fluid={data.frontmatter.featuredImage.childImageSharp.fluid} 
            objectFit="cover"
            objectPosition="50% 50%"
            alt={data.frontmatter.title + ' - Featured image'}
            className="featured-image"
          />
        </Link>
      ) : ""
    }
    <div className="post-content">
      <h2 className="title">
        <Link 
          to={data.frontmatter.slug}
          sx={{
            variant: 'links.postLink'
          }}
        >
          {data.frontmatter.title}
        </Link>
      </h2>
      <date>{data.frontmatter.date}</date>
      <p 
        className="meta"
        sx={{
          color: 'muted',
        }}
      >
      </p>
    </div>
  </article>
)

export default PostCard