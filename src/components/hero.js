import React, { useEffect, useState } from 'react';
import { RiPenNibFill } from 'react-icons/ri';
import { SERVER_URL } from '../global';

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
    <div className='container m-auto h-96'>
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
      <div className="absolute right-0 left-0 -bottom-8">
        <div className="flex justify-center">
          <div className="flex gap-8 px-8 py-6 bg-white shadow-md">
            <div
              className="font-bold leading-none text-left text-md"
            >
              <h2 className="text-red-400">Podepsalo:</h2>
              <p className="text-xl"><Counter /></p>
            </div>
            <div className="justify-self-center self-center">
              <RiPenNibFill className="text-6xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Hero