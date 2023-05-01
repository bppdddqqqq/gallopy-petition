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
        <Link to={menuItem.path} className="h-0 text-gray-300 hover:text-white max-lg:block aria-[current=page]:text-white">{/*max-lg:p-5*/}
          {menuItem.title}
        </Link>
      </li>
    )
    return (
      <header
        className="sticky top-0 z-[5000] shadow-md"
      >
        <div className="bg-yellow-200 py-2 text-black text-center">
          <p>Dnes (1.5.) bude možné podepisovat petici v Kino Scala v čase 17:30-20:30</p>
          {/* <p>Děkujeme za účast v dnešní petici. Nejbližší možnost podepisování petice bude v pon (29.4.) od 14:00</p> */}
          <p>Právně závazní petiční archy jsou nyní ke stažení <Link to="/kestazeni" className="underline">zde</Link></p>
        </div>
        <div className="flex flex-row justify-between w-full px-12 max-lg:px-8 max-md:px-2 lg:pl-8 py-2 bg-red-400 ">
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
