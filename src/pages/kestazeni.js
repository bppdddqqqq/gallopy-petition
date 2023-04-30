import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

export const pageQuery = graphql`
  query PodepsaliQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
    petitionArch: file(relativePath: { eq: "petice_preview.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 600
          height: 600
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    grafika1: file(relativePath: { eq: "grafika/ig_square.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 600
          height: 600
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    grafika2: file(relativePath: { eq: "grafika/placka.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 600
          height: 600
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    grafika3: file(relativePath: { eq: "plakat_screenshot.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 600
          height: 600
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    grafika4: file(relativePath: { eq: "grafika/scala_ve_scale_banner.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 600
          height: 600
          quality: 85
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

const DlPreview = ({ title, gatsbyImageData, src }) => {


  return (
    <a href={src} target="_blank" rel="noreferrer" >
      <div className="p-5 shadow-md">
        <GatsbyImage className="h-32 w-full" image={gatsbyImageData} />
        <p>{title}</p>
      </div>
    </a>
  )
}

const PodepsaliPage = ({ data }) => {
  // console.log(pages)
  return (
    <Layout>
      <div className="mx-auto my-0 mt-8 max-w-3xl">
        <h1>Ke stažení</h1>
        <div className="py-5 w-1/2 mx-auto">
          <div>
            <DlPreview title="Petiční arch" gatsbyImageData={data.petitionArch.childImageSharp.gatsbyImageData} src="https://drive.google.com/file/d/1TDbPRa3lKYCNlaIjYbKRed8RLI9Yyf4G/view?usp=share_link" />
          </div>
        </div>
          <p>
            Zde můžete stahovat podpisový arch pro rychlejší a a komplexnější sběr
            podpisů v místech, kam se ani naši dobrovolníci nedostanou, nebo pokud
            prostě a jednoduše chcete kino podpořit!
          </p>
          <p>
            Berte ale prosím na vědomí, že za ochranu osobních údajů ve formě
            jména, příjmení a adresy bydliště, přebíráme zodpovědnost až v
            momentě, kdy se podpisový arch doručí na adresu k tomu určenou, nebo
            je předán jednomu z našich dobrovolníků.
          </p>
          <p>
            Podpisové archy můžete zasílat na jméno <u>Ondřej Kocar</u>, na adresu{" "}
            <u>Údolní 21, Brno 60200</u>, nebo je po vyplnění odevzdat
            dobrovolníkovi v kině Scala. Pokud je arch zapečetěn v obálce, je
            možno jej odevzdat i na pokladně v kině Scala, kde si ho zapečetěný
            bezpečně přebereme.
          </p>
          <h1>Grafika</h1>
          <p>Pokud chcete Scalu podpořit šířením této petice, můžete k tomu využít jakoukoliv z následujících grafik. Za podporu mockrát děkujeme!</p>
        <div className="grid grid-cols-2 gap-2 md:gap-4 py-5">
          <DlPreview title="Square fotka na Instagram" gatsbyImageData={data.grafika1.childImageSharp.gatsbyImageData} src="/assets/grafika/ig_square.png" />
          <DlPreview title="Kruhové logo na placku" gatsbyImageData={data.grafika2.childImageSharp.gatsbyImageData} src="/assets/grafika/placka.png" />
          <DlPreview title="Plakát" gatsbyImageData={data.grafika3.childImageSharp.gatsbyImageData} src="/assets/grafika/plakat.pdf" />
          <DlPreview title="Pohlednice" gatsbyImageData={data.grafika4.childImageSharp.gatsbyImageData} src="/assets/grafika/scala_ve_scale_banner.png" />
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO />

export default PodepsaliPage
