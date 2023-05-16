import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import OpenLetter from '../content/index/openletter.mdx'
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
    peticeImage: file(relativePath: { eq: "peticephoto-bw2.png" }) {
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
    <div className="flex gap-4 items-center mb-4 justify-center">
      {icon}
      <h1 className="text-left text-white">{header}</h1>
    </div>
    <p className="text-center text-white">{text}</p>
  </div>
)

const HomePage = ({ data }) => {
  const { peticeImage } = data
  // console.log(data)

  const scroller = () => {
    const el = document.querySelector('#petition');
    el.scrollIntoView()
    document.querySelector('.petice button').click()
  }

  return (
    <Layout className='text-left min-h-[80vh]'>
      <Hero className="mb-14" id="top" />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:grid-flow-dense gap-4">
          <div className="self-center h-max">
            <h1>Podepište také fyzickou petici!</h1>
            <p className='text-center'>Nyní máte možnost podepsat i <b>právně závaznou</b>, papírovou formu petice. Učinit tak můžete u našich dobrovolníků, kteří jsou každý den přítomni u kina Scala v předem vypsaných hodinách, nebo na jednom ze <b>sběrných míst</b> petičních podpisů.</p>
          </div>
          <div className='max-h-96 p-8 relative'>
            <div className="absolute left-0 bottom-0 right-0 z-10">
              <OverlayPetice className="h-full w-full"/>
            </div>
            <GatsbyImage alt="Fotka peticniho archu" className='h-full rounded-xl' image={peticeImage.childImageSharp.gatsbyImageData}/>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <h1>Kde můžu podepsat?</h1>
        <p className="text-center mt-3">Podepsat petici můžete zejména i u našich dobrovolníků v určených hodinách přímo v prostorách kina Scala, pokud ale nemáte prostor na podpis v hodiny dobrovolnictví, můžete petici podepsat rovněž na těchto místech:</p>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 mt-8">
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6 pl-4">Brno</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Café Bar Scala</h3><p>Moravské nám. 3, Brno</p></li>
              <li><h3>Divadlo Husa na provázku</h3><p>Zelný trh 294, Brno</p></li>
              <li><h3>Na Dráze</h3><p>Nádražní 9, Brno</p></li>
              <li><h3>Hudy Lezecká stěna</h3><p>Vídeňská 297/v, Brno</p></li>
              <li><h3>Lezecká stěna Betonka</h3><p>U Dálnice 777, Brno</p></li>
            </ul>
          </div>
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6 pl-4">Praha</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Bio Oko</h3><p>Františka Křížka 460/15, Praha 7</p></li>
              <li><h3>Kino Světozor</h3><p>Vodičkova 41, Praha 1</p></li>
              <li><h3>Kino Přítomnost</h3><p>Siwiecova 1,Praha 3</p></li>
              <li><h3>Kino Aero</h3><p>Biskupcova 31, Praha 3</p></li>
              <li><h3>Edison Filmhub</h3><p>Jeruzalémská 1321/2, Praha 1</p></li>
            </ul>
          </div>
          <div>
            <h2 className="bg-red-200 rounded-lg text-left px-6 pl-4">Hradec Králové</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Bio Central</h3><p>Karla IV. 774, Hradec Králové</p></li>
            </ul>
            <h2 className="bg-red-200 rounded-lg text-left px-6 pl-4 mt-6">Boskovice</h2>
            <ul className="place-list mx-4 mt-4">
              <li><h3>Kulturní a Komunitní centrum Prostor</h3><p>Hradní 3, Boskovice</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-10 mt-2 relative overflow-hidden">
          <div className="max-w-3xl container mx-auto">
            <p className='text-center'>Univerzitní kino Scala oslovuje už 10 let příznivce kulturního dění napříč věkovými kategoriemi. “To své” si v programu díky lidem, kteří se o provoz kina s láskou starají, najdou děti při víkendových projekcích pro nejmladší, studenti během akademického roku při výuce, milovníci filmu, zájmových přednášek, besed nebo čtení, i senioři v rámci pravidelného klubového setkávání. Scala a program, který nabízí a často i sama inspiruje, má fanoušky všude, jen ne na Magistrátu města Brna. Tomu chceme co největším počtem podpisů připomenout, že jde o místo s nezaměnitelnou atmosférou a početnou komunitou lidí, kteří za jeho zachování chtějí bojovat.</p>
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
          <Card header="Vzdělání" text="Scala není jenom zábava, ale i vzdělání a výchova k hodnotám. Výuku sem zasadila Masarykova univerzita, vzdělávací platforma tu pak dál roste z festivalových stálic jako je Jeden svět nebo Serial Killer." icon={<EduSvg className="h-12" />} />
          <Card header="Vztah" text="Scala se v průběhu posledních deseti let stala pro stovky, snad i tisíce lidí místem prvního kontaktu s brněnskou kulturní scénou a řadou osobností, které ji utváří. Neformální, přátelská a přitom inspirativní atmosféra Scaly ve městě nemá obdobu a pro mnohé představuje srdeční záležitost, příležitost diskutovat, seznámit se, zamilovat se." icon={<LoveSvg className="h-12" />} />
          <Card header="Kultura" text="Kultura je ve Scale miliónová. Od roku 2013 kino navštívilo přes 1&nbsp;000&nbsp;000 lidí, ať už v rámci projekcí, přednášek, besed nebo jiných akcí, které Scala pravidelně hostí." icon={<CultureSvg className="h-12" />}  className="md:max-lg:col-start-1 md:max-lg:col-end-3 md:max-lg:mx-auto md:max-lg:w-1/2"/>
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
        <div className='container mx-auto bg-white lg:p-8 max-w-4xl lg:border-b-4 lg:border-b-red-400 lg:text-center'>
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
