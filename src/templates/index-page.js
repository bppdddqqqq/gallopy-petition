/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,  
} from "react-icons/ri"
import {
  SiTed
} from "react-icons/si"
import { FaWordpress, FaVk } from "react-icons/fa"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"
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

const HomePage = ({ data }) => {
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
        {icons.icon === "linkedin" ? (
          <Link to={icons.url} target="_blank">
            <RiLinkedinBoxFill />
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
        {icons.icon === "rss" ? (
          <Link to={icons.url} target="_blank">
            <RiRssFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "github" ? (
          <Link to={icons.url} target="_blank">
            <RiGithubFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "telegram" ? (
          <Link to={icons.url} target="_blank">
            <RiTelegramFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "pinterest" ? (
          <Link to={icons.url} target="_blank">
            <RiPinterestFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "snapchat" ? (
          <Link to={icons.url} target="_blank">
            <RiSnapchatFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "skype" ? (
          <Link to={icons.url} target="_blank">
            <RiSkypeFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "wordpress" ? (
          <Link to={icons.url} target="_blank">
            <FaWordpress />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "dribbble" ? (
          <Link to={icons.url} target="_blank">
            <RiDribbbleFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "medium" ? (
          <Link to={icons.url} target="_blank">
            <RiMediumFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "behance" ? (
          <Link to={icons.url} target="_blank">
            <RiBehanceFill />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "vk" ? (
          <Link to={icons.url} target="_blank">
            <FaVk />
          </Link>
        ) : (
          ""
        )}
        {icons.icon === "ted" ? (
          <Link to={icons.url} target="_blank">
            <SiTed />
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
      <Seo title={frontmatter.title} description={excerpt} />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <div className="title fullize">
            <h1 className={colorMode === "default" ? "" : "white"}> 
            Hi. 👋
            </h1>
          </div>
          <p
            className="tagline"
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
            className="button"
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          <div className="social-icons" sx={indexStyles.socialIcons}>
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <Img
              fluid={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="">
        <div>
          <MDXRenderer className="description">{body}</MDXRenderer>
        </div>
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
