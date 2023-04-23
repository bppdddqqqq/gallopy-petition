import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import IndexText from '../content/index/maintext.mdx'
import OpenLetter from '../content/index/openletter.mdx'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image-es5'
import Hero from '../components/hero'
import { RiInstagramFill } from 'react-icons/ri'
import Petition from '../components/petition'

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
    gallery1: file(relativePath: { eq: "sca30.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 480
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
  const { placeholderImage } = data
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
      <div className="container mx-auto my-10 mt-24 max-w-2xl">
          <IndexText />
        
        {/* <div className="max-w-md gapped-image">
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
        </div> */}
        <h2 className="mt-8">Proc by mela Scala existovat?</h2>
      </div>
      <div className="container grid grid-cols-3 gap-16 mx-auto mt-12 max-w-6xl">
        {Array.from({length: 3}, (_, idx) => (<div key={idx} className="relative p-5 bg-red-400 shadow-md">
          <h1 className="mt-6 mb-8 w-full text-white">Issue 1</h1>
          <p className="text-center text-white">Excepturi tempore officiis cumque ad voluptatem eveniet vero.</p>
          <div className="absolute right-0 left-0 -top-8">
            <div className="mx-auto w-fit bg-red-300 text-5xl !text-red-400 p-3 rounded-full shadow-md">
              <RiInstagramFill/>
            </div>
          </div>
        </div>))}
      </div>
      <div className="grid grid-cols-5 gap-2 my-12 bg-black">
        {
          Array.from({ length: 5 }, (_, i) => (<div key={i} >
            <GatsbyImage
              className="h-48"
              image={data.gallery1.childImageSharp.gatsbyImageData}
              alt="Ditto"
            />
          </div>))
        }
      </div>
      <div className="container mx-auto mb-12 max-w-2xl">
        <div className="p-5 bg-white">
          <OpenLetter components={{h1: (props) => (<h1 className="text-left text-black" {...props}></h1>)}} />
        </div>
        <div className="p-5 pt-0 bg-white">
          <Petition />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
