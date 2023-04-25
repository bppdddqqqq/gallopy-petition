import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { RiInstagramFill } from 'react-icons/ri'

const Footer = () => (
  <footer
    className="py-3 bg-red-400"
  >
    <div className="container mx-auto max-w-6xl grid grid-cols-4 max-lg:grid-cols-3 gap-4 text-white">
      <div><StaticImage src='../../static/assets/scala_logo.png' objectFit='contain'/></div>
      <div className="col-span-2">
        <h3 className="font-bold">Kontakty:</h3>
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          <ul className="list-none text-md leading-6">
            <li><a href="mailto:kocar@kopro.team">Ondřej Kocar</a>, +420730170940</li>
          </ul>
          <ul className="list-none text-md leading-6">
            <li><a href="mailto:daliborjelinek01@gmail.com">Dalibor Jelínek</a>, +420728947279</li>
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