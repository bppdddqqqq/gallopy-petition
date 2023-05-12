import React from 'react'
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import IndexText from '../content/index/maintext.mdx'
import OpenLetter from '../content/index/openletter.mdx'
import { convertToBgImage } from 'gbimage-bridge'
import BackgroundImage from 'gatsby-background-image-es5'
import Hero from '../components/hero'
import Petition from '../components/petition'
import { SEO } from '../components/seo'
import BigLetter from '../content/index/bigletter.mdx'
import CultureSvg from '../../static/assets/pillar.svg';
import EduSvg from '../../static/assets/edu.svg';
import LoveSvg from '../../static/assets/heart.svg';
import LeftSide from '../../static/assets/left-side.svg';
import RightSide from '../../static/assets/right-side.svg';
import OverlayPetice from '../../static/assets/overlay.svg';
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
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    peticeImage: file(relativePath: { eq: "peticefoto.JPG" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 800
          height: 800
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

const Card = ({text, header, icon, className = ''}) => (
  <div className={"p-5 px-8 bg-red-500 shadow-md rounded-lg "+className}>
    <div className="flex gap-2 items-center mb-2">
      {icon}
      <h1 className="text-left text-white">{header}</h1>
    </div>
    <p className="text-center text-white">{text}</p>
  </div>
)

const HomePage = ({ data }) => {
  const { placeholderImage, peticeImage } = data
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
      <div className="bg-red-400 mb-14" id="top">
        <BackgroundImage 
          {...bg}
          
          className="w-100">
          <Hero />
        </BackgroundImage>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:grid-flow-dense gap-4">
          <div className="self-center h-max">
            <h1>Podepište také fyzickou petici!</h1>
            <p>Nyní máte možnost podepsat i právně závaznou, papírovou formu petice. Učinit tak můžete u našich dobrovolníků, kteří jsou každý den přítomni u kina Scala v předem vypsaných hodinách, nebo na jednom ze sběrných míst petičních podpisů.</p>
          </div>
          <div className='max-h-80 p-8 relative'>
            <div className="absolute left-0 bottom-0 right-0 z-10">
              <OverlayPetice className="h-full w-full"/>
            </div>
            <GatsbyImage className='h-full rounded-xl' image={peticeImage.childImageSharp.gatsbyImageData} />
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <h1>Kde můžu podepsat?</h1>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 mt-16">
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6">Brno</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Café Bar Scala</h3><p>Moravské nám. 3, Brno</p></li>
              <li><h3>Divadlo Husa na provázku</h3><p>Zelný trh 294, Brno</p></li>
              <li><h3>Na Dráze</h3><p>Nádražní 9, Brno</p></li>
            </ul>
          </div>
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6">Praha</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Bio Oko</h3><p>Františka Křížka 460/15, Praha 7</p></li>
              <li><h3>Kino Světozor</h3><p>Vodičkova 41, Praha 1</p></li>
              <li><h3>Kino Přítomnost</h3><p>Siwiecova 1,Praha 3</p></li>
              <li><h3>Kino Přítomnost</h3><p>Biskupcova 31, Praha 3</p></li>
            </ul>
          </div>
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6">Hradec Králové</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Bio Central</h3><p>Karla IV. 774, Hradec Králové</p></li>
            </ul>
            <h2 className="bg-red-200 rounded-lg text-left px-6 mt-6">Boskovice</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Kulturní a Komunitní centrum Prostor</h3><p>Hradní 3, Boskovice</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-10 mt-2 relative overflow-hidden">
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
        <div className="container grid grid-cols-3 gap-16 mx-auto mt-14 max-w-6xl max-lg:grid-cols-2 max-md:grid-cols-1">
          <Card header="Vzdělání" text="Scala není jenom zábava, ale i vzdělání a výchova k hodnotám. Výuku sem zasadila Masarykova univerzita, vzdělávací platforma tu pak dál roste z festivalových stálic jako je Jeden svět nebo Serial Killer." icon={<EduSvg className="h-12 w-12" />} />
          <Card header="Vztah" text="Scala se v průběhu posledních deseti let stala pro stovky, snad i tisíce lidí místem prvního kontaktu s brněnskou kulturní scénou a řadou osobností, které ji utváří. Neformální, přátelská a přitom inspirativní atmosféra Scaly ve městě nemá obdobu a pro mnohé představuje srdeční záležitost, příležitost diskutovat, seznámit se, zamilovat se." icon={<LoveSvg className="h-12 w-12" />} />
          <Card header="Kultura" text="Kultura je ve Scale miliónová. Od roku 2013 kino navštívilo přes 1&nbsp;000&nbsp;000 lidí, ať už v rámci projekcí, přednášek, besed nebo jiných akcí, které Scala pravidelně hostí." icon={<CultureSvg className="h-12 w-12" />}  className="md:max-lg:col-start-1 md:max-lg:col-end-3 md:max-lg:mx-auto md:max-lg:w-1/2"/>
        </div>
      </div>
      <div className="mx-auto mb-4 max-w-5xl px-5 bg-red-100 pb-2 petice relative">
        <div className="absolute -top-14" id="petition"/>
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
