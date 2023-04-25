import React from 'react'
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import IndexText from '../content/index/maintext.mdx'
import OpenLetter from '../content/index/openletter.mdx'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image-es5'
import Hero from '../components/hero'
import { RiInstagramFill } from 'react-icons/ri'
import Petition from '../components/petition'
import { SEO } from '../components/seo'
import BigLetter from '../content/index/bigletter.mdx'
import CultureSvg from '../../static/assets/pillar.svg';
import EduSvg from '../../static/assets/edu.svg';
import LoveSvg from '../../static/assets/heart.svg';
import LeftSide from '../../static/assets/left-side.svg';
import RightSide from '../../static/assets/right-side.svg';
import LastSignees from '../components/last-signees'


export const pageQuery = graphql`
  query HomeQuery {
    placeholderImage: file(relativePath: { eq: "web_banner.png" }) {
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
  }
`

const Card = ({text, header, icon, className = ''}) => (
  <div className={"relative p-5 bg-red-400 shadow-md "+className}>
    <h1 className="mt-6 mb-8 w-full text-white">{header}</h1>
    <p className="text-center text-white">{text}</p>
    <div className="absolute right-0 left-0 -top-8">
      <div className="mx-auto w-fit bg-red-300 text-5xl !text-red-400 p-3 rounded-full shadow-md">
        {icon}
      </div>
    </div>
  </div>
)

const HomePage = ({ data }) => {
  const { placeholderImage } = data
  const image = getImage(placeholderImage)
  const bg = convertToBgImage(image)
  // console.log(data)

  const scroller = () => {
    const el = document.querySelector('#petition');
    el.scrollIntoView()
    document.querySelector('.petice button').click()
  }

  return (
    <Layout className='text-left min-h-[80vh]'>
      <div className="" id="top">
        <BackgroundImage
          {...bg}
          preserveStackingContext
          className="w-100">
          <Hero />
        </BackgroundImage>
      </div>
      <div className="py-10 pt-24 relative overflow-hidden">
          <div className="max-w-3xl container mx-auto">
            <IndexText />
            <div className="text-center mt-4">
              <button onClick={scroller}>K petici</button>
            </div>
          </div>
          <div className="absolute bottom-0 left-8 -z-10 top-5">
            <LeftSide />
          </div>
          <div className="absolute bottom-0 right-8 -z-10 top-5">
            <RightSide />
          </div>
      </div>
      <div className="bg-red-200 pb-12 mb-12 lg:mb-24 pt-6">
        <h2 className="mt-8">Proč by měla Scala existovat?</h2>
        <div className="container grid grid-cols-3 gap-16 mx-auto mt-14 max-w-5xl max-lg:grid-cols-2 max-md:grid-cols-1">
          <Card header="Vzdělání" text="Scala není jenom zábava, ale i vzdělání a výchova k hodnotám. Výuku sem zasadila Masarykova univerzita, vzdělávací platforma tu pak dál roste z festivalových stálic jako je Jeden svět nebo Serial Killer." icon={<EduSvg className="h-12 w-12" />} />
          <Card header="Vztah" text="Scala se v průběhu posledních deseti let stala pro stovky, snad i tisíce lidí místem prvního kontaktu s brněnskou kulturní scénou a řadou osobností, které ji utváří. Neformální, přátelská a přitom inspirativní atmosféra Scaly ve městě nemá obdobu a pro mnohé představuje srdeční záležitost, příležitost diskutovat, seznámit se, zamilovat se." icon={<LoveSvg className="h-12 w-12" />} />
          <Card header="Kultura" text="Kultura je ve Scale miliónová. Od roku 2013 kino navštívilo přes 1&nbsp;000&nbsp;000 lidí, ať už v rámci projekcí, přednášek, besed nebo jiných akcí, které Scala pravidelně hostí." icon={<CultureSvg className="h-12 w-12" />}  className="md:max-lg:col-start-1 md:max-lg:col-end-3 md:max-lg:mx-auto md:max-lg:w-1/2"/>
        </div>
      </div>
      <div className="mx-auto mb-4 max-w-5xl px-5 bg-red-100 pb-2 petice relative">
        <div className="absolute -top-8" id="petition"/>
        <div className="py-8">
          <h1 className="text-6xl text-left pb-4">Petice</h1>
          <OpenLetter components={{h2: (props) => (<h2 className="text-black text-xl font-normal" {...props}></h2>)}} />
        </div>
        <div className="mx-auto w-fit">
          <Petition />
        </div>
      </div>
      <LastSignees />
      <div className="relative w-100 overflow-hidden mb-16">
        <div className='container mx-auto bg-white lg:p-8 max-w-4xl border-b-4 border-b-red-400 lg:text-center'>
            <div className="text-center p-8 px-24">
              <h1 className="">A co dál?</h1>
            </div>
            <BigLetter />
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <SEO />
)

export default HomePage
