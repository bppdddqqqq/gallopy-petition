/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const settings = require("./src/util/site.json")
// const path = require('path')
// const process = require('process')

module.exports = {
  siteMetadata: settings.meta,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        icon: 'static/favicon.png'
      }
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-background-image-es5',
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    // {
    //   resolve: 'gatsby-plugin-favicons',
    //   options: {
    //     logo: './static/assets/favicon.png',
    //     appName: 'Scala ve Scale',
    //     background: '#fff',
    //     icons: {
    //       android: true,
    //       appleIcon: true,
    //       appleStartup: true,
    //       coast: false,
    //       favicons: true,
    //       yandex: false,
    //       windows: false
    //     }
    //   }
    // }
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Scala ve Scale`,
        short_name: `Scala ve Scale`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#B22828`,
        display: `standalone`,
        icon: "static/assets/gatsby-icon.png",
      },
    },
  ],
}
