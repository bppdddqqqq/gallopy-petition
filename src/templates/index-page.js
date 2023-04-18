import React from 'react'
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiYoutubeFill,
  RiInstagramFill,
} from "react-icons/ri"
import Layout from "../components/layout"
import Icons from "../util/socialmedia.json"


export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              width: 600
              height: 400
              quality: 80
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
  }
`
/*
childImageSharp {
            fluid(
              maxWidth: 480
              maxHeight: 380
              quality: 80
              srcSetBreakpoints: [960, 1440]
            ) {
              ...GatsbyImageSharpFluid
            }
          }
*/

const HomePage = ({ data, children }) => {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter, body, excerpt } = mdx
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const sIcons = Icons.socialIcons.map((icons, idx) => (
    <div key={idx}>
      {icons.icon === "facebook" ? (
        <Link to={icons.url} target="_blank">
          <RiFacebookBoxFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "twitter" ? (
        <Link to={icons.url} target="_blank">
          <RiTwitterFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "youtube" ? (
        <Link to={icons.url} target="_blank">
          <RiYoutubeFill />
        </Link>
      ) : (
        ""
      )}
      {icons.icon === "instagram" ? (
        <Link to={icons.url} target="_blank">
          <RiInstagramFill />
        </Link>
      ) : (
        ""
      )}
    </div>
  )
  )
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 items-center px-8 py-4 md:py-2 md:px-16 md:grid-cols-2">
        <div>
          <div className="m-0 text-3xl font-bold md:text-5xl">
            <h1 className="">
              Hi. 👋
            </h1>
          </div>
          <p
            className="mt-1"
          >
            {frontmatter.tagline}
          </p>
          <p>
            Or a small remnant of a developer lmao
          </p>
          <Link
            to={frontmatter.cta.ctaLink}
            className="mt-8 button"
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          <div className="flex gap-4 mt-6 text-4xl md:mt-3">
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="rounded-md"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mb-8 md-styling">
        {children}
      </div>
    </Layout>
  )
}

export default HomePage
