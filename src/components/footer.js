import React from 'react'
import { RiInstagramFill } from 'react-icons/ri'

import ScalaLogo from '../../static/assets/scala-logo.svg'

const Footer = () => (
  <footer
    className="py-3 bg-red-400"
  >
    <div className="container mx-auto max-w-6xl grid grid-cols-4 max-lg:grid-cols-3 gap-4 text-white">
      <div>
        <ScalaLogo className="h-40 w-full"/>
      </div>
      <div className="col-span-2">
        <h3 className="font-bold">Kontakty:</h3>
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          <ul className="list-none text-md leading-6">
            <li><a href="mailto:kocar@kopro.team">Ondřej Kocar</a>, +420&nbsp;730&nbsp;170&nbsp;940</li>
          </ul>
          <ul className="list-none text-md leading-6">
            <li><a href="mailto:daliborjelinek01@gmail.com">Dalibor Jelínek</a>, +420&nbsp;728&nbsp;947&nbsp;279</li>
          </ul>
        </div>
        <div className="text-white mt-4 fill-white flex flex-row text-3xl w-fit gap-2">
          {/* <a href="" target="_blank"><RiFacebookBoxFill /></a> */}
          <a href="https://www.instagram.com/scala_ve_scale" target="_blank" rel="noreferrer"><RiInstagramFill /></a>
        </div>
      </div>
      <div>

      </div>
    </div>
  </footer>
)

export default Footer