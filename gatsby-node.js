const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            template
            title
          }
          internal {
            contentFilePath 
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const posts = result.data.allMdx.nodes
  let blogPostsCount = 0

  posts.forEach((post, index) => {
    const id = post.id
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    const url = path.resolve(`src/templates/${String(post.frontmatter.template)}.js`)
    createPage({
      path: post.frontmatter.slug,
      component: `${url}?__contentFilePath=${post.internal.contentFilePath}`,
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count blog posts.
    if (post.frontmatter.template === 'blog-post') {
      blogPostsCount++
    }
  })

  // Create blog-list pages
  const postsPerPage = 15
  const numPages = Math.ceil(blogPostsCount / postsPerPage)

  const url = path.resolve(`./src/templates/blog-list.js`)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: `${url}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // If production JavaScript and CSS build
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    })
  }
};