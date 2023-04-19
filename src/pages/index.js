import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import IndexText from '../content/index/maintext.mdx'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image-es5'
import Hero from '../components/hero'

export const pageQuery = graphql`
  query HomeQuery {
    placeholderImage: file(relativePath: { eq: "sca30.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 1920
          height: 800
          quality: 85
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    info1: file(relativePath: { eq: "sca30.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 640
          height: 320
          quality: 85
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { placeholderImage} = data
  const image = getImage(placeholderImage)
  const bg = convertToBgImage(image)
  console.log(data)

  return (
    <Layout className='text-left min-h-[80vh]'>
      <div className="">
        <BackgroundImage
          {...bg}
          preserveStackingContext
          className="w-100">
            <Hero />
        </BackgroundImage>
      </div>
      <div className="container flex gap-4 justify-between items-center mx-auto my-10 mt-12">
        <div className='max-w-2xl'>
          <IndexText />
        </div>
        <div className="max-w-md gapped-image">
          <GatsbyImage
            image={data.info1.childImageSharp.gatsbyImageData}
            alt="Ditto"
          />
          <GatsbyImage
            image={data.info1.childImageSharp.gatsbyImageData}
            alt="Ditto"
          />
          <GatsbyImage
            image={data.info1.childImageSharp.gatsbyImageData}
            alt="Ditto"
          />
        </div>
      </div>
      <div className="container grid grid-cols-4 gap-4 mx-auto mt-2 mb-10">
        <div>
          <h1>Issue 1</h1>
          <p>Excepturi tempore officiis cumque ad voluptatem eveniet vero.</p>
        </div>
        <div>
          <h1>Issue 1</h1>
          <p>Excepturi tempore officiis cumque ad voluptatem eveniet vero.</p>
        </div>
        <div>
          <h1>Issue 1</h1>
          <p>Excepturi tempore officiis cumque ad voluptatem eveniet vero.</p>
        </div>
        <div>
          <h1>Issue 1</h1>
          <p>Excepturi tempore officiis cumque ad voluptatem eveniet vero.</p>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
