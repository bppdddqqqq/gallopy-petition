import React, { useEffect, useState } from 'react';
import { FaPenNib as RiPenNibFill } from 'react-icons/fa';
import { SERVER_URL } from '../global';
import ScalaLogo from '../../static/assets/scala-logo.svg'

const Counter = () => {
  let [count, setCount] = useState(null)
  useEffect(() => {
    if (count != null) {
      return;
    }
    fetch(`${SERVER_URL}/count`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
      setCount(data)
    });
  })

  if (count === null) {
    return '...'
  }
  return count
}

const Hero = () => (
  <div className="relative">
    <div className='container m-auto h-96 flex justify-center items-center pb-8'>
      {/* <h1 className="m-0 text-3xl font-bold leading-0 md:text-5xl">
        Ahoj. 👋
      </h1>
      <p
        className="mt-1 text-xl"
      >
        Máme jednu nepříjemnou správu. Magistrát města Brno nám chce zavřít Kino Scala
      </p>
      <p className="mb-8 text-md">
        A potřebujeme vaši pomoc
      </p>
      <Link
        to="https://google.com"
        className="font-bold button"
      >
        Podepsat
        <span className="icon -right">
          <RiArrowRightSLine />
        </span>
      </Link> */}
      <ScalaLogo className="h-40" />
      <div className="absolute right-0 left-0 -bottom-8">
        <div className="flex justify-center">
          <div className="flex gap-8 px-8 py-6 bg-white shadow-md">
            <div
              className="font-bold leading-none text-left text-md"
            >
              <h2 className="text-red-400">Podepsalo:</h2>
              <p className="text-xl my-1 text-center"><Counter /></p>
              <small>(aktualizace každých 15 min)</small>
            </div>
            <div className="justify-self-center self-center">
              <RiPenNibFill className="text-6xl text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Hero
