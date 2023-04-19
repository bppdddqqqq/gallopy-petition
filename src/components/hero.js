import { Link } from 'gatsby';
import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const Hero = () => (
  <div className="relative text-white bg-black bg-opacity-50">
    <div className='container pt-16 pb-24 m-auto'>
      <h1 className="m-0 text-3xl font-bold leading-0 md:text-5xl">
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
      </Link>
      <div className="absolute right-0 left-0 -bottom-5">
        <div className="flex justify-center">
          <div className="overflow-hidden w-screen md:w-fit md:rounded-full xl:min-w-xl lg:min-w-lg md:min-w-md bg-neutral-200 dark:bg-neutral-600">
            <div
              className="p-0.5 py-3 font-bold leading-none text-center text-white bg-blue-600 text-md"
              style={{width: "52%"}}>
              Podepsáno 652
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Hero