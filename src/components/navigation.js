import React from 'react'
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
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
      <li key={index} className="inline-block ml-5 max-lg:block max-lg:ml-0">
        <Link to={menuItem.path} className="h-0 text-slate-50 hover:text-gray-200 max-lg:block max-lg:p-5">
          {menuItem.title}
        </Link>
      </li>
    )
    return (
      <header 
        className="flex sticky top-0 justify-between items-center p-5 py-3 z-[5000] bg-black"
      >
        <div className="flex flex-row max-lg:justify-between max-lg:w-full">
          <div className="flex flex-row my-auto font-bold">
            <Link className="inline justify-center pl-1 mx-0 my-auto font-sans text-2xl font-bold text-white" to="/"><p>Scala pro Scalu</p></Link>
          </div>
          <nav id="nav" className="my-auto max-lg:ml-auto">
            <button onClick={this.handleToggleClick} className={"hidden text-2xl bg-none border-none white max-lg:flex group peer" + (this.state.showMenu ? " is-active" : "")}>
              <div className="text-white flex group-[.is-active]:hidden"><RiMenu3Line/></div>
              <div className="text-white hidden group-[.is-active]:flex"><RiCloseLine/></div>
            </button>
            <ul className="p-0 m-0 list-none max-lg:hidden peer-[.is-active]:block max-lg:absolute max-lg:right-0 max-lg:top-full max-lg:z-10 max-lg:w-full max-lg:max-w-xs max-lg:rounded-bl-md max-lg:overflow-hidden max-lg:bg-black">
              {listMenuItems}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Navigation