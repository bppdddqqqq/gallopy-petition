/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiYoutubeFill,
  RiInstagramFill,
} from "react-icons/ri"
import Layout from "../components/layout"
import Icons from "../util/socialmedia.json"

import { useColorMode } from "theme-ui"

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
            fluid(
              maxWidth: 480
              maxHeight: 380
              quality: 80
              srcSetBreakpoints: [960, 1440]
            ) {
              ...GatsbyImageSharpFluid
            }
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

const HomePage = ({ data, children }) => {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter, body, excerpt } = mdx
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : ""
  const sIcons = Icons.socialIcons.map(icons => {
    return (
      <div>
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
  })
  const [colorMode] = useColorMode()
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 items-center px-8 py-4 md:py-2 md:px-16 md:grid-cols-2">
        <div>
          <div className="m-0 text-3xl font-bold md:text-5xl">
            <h1 className={colorMode === "default" ? "" : "white"}> 
            Hi. 👋
            </h1>
          </div>
          <p
            className="mt-1"
            sx={{
              color: "muted",
            }}
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
          <div className="flex gap-4 mt-6 text-4xl md:mt-3" sx={indexStyles.socialIcons}>
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <Img
              fluid={Image}
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

const indexStyles = {
  socialIcons: {
    a: {
      color: "socialIcons",
      ":hover": {
        color: "socialIconsHover",
      },
    },
  },
}
