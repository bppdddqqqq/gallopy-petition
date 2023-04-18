/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// const settings = require("./src/util/site.json")
// const path = require('path')
// const process = require('process')

module.exports = {
  // siteMetadata: settings.meta,
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              showCaptions: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-postcss',
    `gatsby-plugin-sass`,
    'gatsby-plugin-theme-ui',
    // {
    //   resolve: 'gatsby-plugin-react-svg',
    //   options: {
    //     rule: {
    //       include: /assets/
    //     }
    //   }
    // },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `TEDxMasarykUniversity`,
    //     short_name: `TEDxMasarykUniversity`,
    //     start_url: `/`,
    //     background_color: `#f7f0eb`,
    //     theme_color: `#E62B1E`,
    //     display: `standalone`,
    //     icon: "static" + settings.meta.iconimage,
    //   },
    // },
  ],
}
