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

  posts.forEach((post, index) => {
    const id = post.id
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    if (!post.frontmatter.template) {
      return;
    }

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