import React from 'react'
import { Link } from "gatsby"
import { RiInstagramFill } from 'react-icons/ri';
import navigatorJson from '../util/navigator.json'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showMenu: false}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showMenu: !state.showMenu
    }))
  }

  render () {
    const listMenuItems = navigatorJson.menuItems.map((menuItem, index) =>
      <li key={index} className="inline-block mr-1 md:mr-5 "> {/*max-lg:block max-lg:ml-0*/}
        <Link to={menuItem.path} className="h-0 text-white hover:text-pink-100 font-bold max-lg:block aria-[current=page]:text-white">{/*max-lg:p-5*/}
          {menuItem.title}
        </Link>
      </li>
    )
    return (
      <header
        className="sticky top-0 z-[5000] shadow-md"
      >
     {/* <StaticQuery query={graphql`
              query MyQuery {
                allFile(filter: {relativeDirectory: {eq: "perex"}}) {
                  nodes {
                    childMdx {
                      frontmatter {
                        msg
                      }
                    }
                  }
                }
              }
            `} render={x => {
              if (x.allFile.nodes.length == 0) {
                return <></>
              }
              return <div className="bg-yellow-200 py-2 text-black text-center">
                {x.allFile.nodes.map(x => {
                  const { frontmatter } = x.childMdx;
                  const { msg, link, linktext } = frontmatter

                  if (link && linktext) {
                    return (
                      <p>{msg} <Link to={link}><button className="text-sm p-2 ml-4">{linktext}</button></Link></p>
                    )
                  }
                  return (<p>{msg}</p>)
                })}
              </div>
            }} />*/}
        <div className="flex flex-row justify-between w-full px-12 max-lg:px-8 max-md:px-2 lg:pl-8 py-2 bg-red-500 ">
          <nav id="nav" className="my-auto max-lg:ml-auto">
            <ul className="p-0 m-0 list-none">
              {listMenuItems}
            </ul>
          </nav>
          <div className="my-auto ml-auto text-white">
            <div className="flex gap-4 text-3xl">
              {/* <a href="" target="_blank"><RiFacebookBoxFill /></a> */}
              <a href="https://www.instagram.com/scala_ve_scale" target="_blank" rel="noreferrer"><RiInstagramFill /></a>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Navigation
