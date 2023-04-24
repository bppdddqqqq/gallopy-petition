import React from 'react'
import { RiFacebookBoxFill, RiInstagramFill } from 'react-icons/ri'

const Footer = () => (
  <footer
    className="py-3 bg-red-400"
  >
    <div className="container mx-auto max-w-6xl grid grid-cols-5 max-lg:grid-cols-3 text-white">
      <div>Logo</div>
      <div>
        <h3 className="font-bold">Kontakty:</h3>
        <ul className="list-none text-md leading-6">
          <li>Kontakt</li>
          <li>Kontakt</li>
        </ul>
        <div className="text-white mt-4 fill-white flex flex-row text-3xl w-fit gap-2"><RiFacebookBoxFill /><RiInstagramFill /></div>
      </div>
      <div>
        <ul className="list-none text-md leading-6">
          <li>Kontakt</li>
          <li>Kontakt</li>
          <li>Kontakt</li>
          <li>Kontakt</li>
        </ul>
      </div>
    </div>
  </footer>
)

export default Footer