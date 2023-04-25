import React from 'react'
import { RiInstagramFill } from 'react-icons/ri'

import ScalaLogo from '../../static/assets/scala-vert.svg'

const Footer = () => (
  <footer
    className="py-3 bg-red-400"
  >
    <div className="container mx-auto max-w-6xl md:max-w-4xl w-full grid grid-cols-3 gap-4 text-white">
      <div>
        <ScalaLogo className="overflow-hidden h-24 w-24"/>
      </div>
      <div className="">
        <h3 className="font-bold">Kontakty:</h3>
        <ul className="list-none text-md leading-6">
          <li className="list-none ml-1"><a href="mailto:scalavescale@gmail.com">scalavescale@gmail.com</a></li>
          <li className="list-none ml-1"><a href="mailto:kocar@kopro.team">Ondřej Kocar</a>, +420&nbsp;730&nbsp;170&nbsp;940</li>
          <li className="list-none ml-1"><a href="mailto:daliborjelinek01@gmail.com">Dalibor Jelínek</a>, +420&nbsp;728&nbsp;947&nbsp;279</li>
        </ul>
      </div>
      <div className="text-white fill-white text-6xl flex justify-center lg:justify-end">
          {/* <a href="" target="_blank"><RiFacebookBoxFill /></a> */}
          <a href="https://www.instagram.com/scala_ve_scale" target="_blank" rel="noreferrer"><RiInstagramFill /></a>
      </div>
    </div>
  </footer>
)

export default Footer