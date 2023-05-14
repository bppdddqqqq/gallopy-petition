import React, { useEffect, useState } from 'react';
import { FaPenNib as RiPenNibFill } from 'react-icons/fa';
import { SERVER_URL } from '../global';
import ScalaLogo from '../../static/assets/scala-logo.svg'
import BannerHands from '../../static/assets/svg_ruky.svg'
import { useSpring, animated } from 'react-spring';

const Hero = ({className = '', id = ''}) => {
  const spring = useSpring({from: { val: 0}});
  const cssSpring = useSpring({from: { val: 0}});
  const [loaded, setLoaded ] = useState(false)

  useEffect(() => {
    if (loaded) {
      return;
    }
    fetch(`${SERVER_URL}/count`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.text();
    })
      .then((data) => {
        setLoaded(true)
        setTimeout(() => {
          spring.val.start({ to: {val: Number(data)}, from: { val: 0 }, config: {duration: Number(data), round: 2}, })
          cssSpring.val.start({ to: {val: Number(data)/50}, from: { val: 0 }, config: {duration: Number(data), round: 20}, })
        }, 500)
      });
  })
  
  return (
    <div className={"bg-red-500 max-h-96 relative "+className} id={id}>
      <animated.div className="absolute h-full overflow-hidden top-0 bottom-0 -left-[9999px] -right-[9999px] m-auto flex justify-center" style={{'--opacity-hands': cssSpring.val}}>
        <BannerHands className="h-full w-full"/>
      </animated.div>
      <div className="relative">
        <div className='container m-auto h-96 flex justify-center items-center pb-8'>
          <ScalaLogo className="h-40" />
          <div className="absolute right-0 left-0 -bottom-9">
            <div className="flex justify-center">
              <div className="flex gap-8 px-8 py-6 bg-white shadow-md rounded-lg">
                <div
                  className="font-bold leading-none text-left text-md"
                >
                  <h2 className="text-red-400">Podepsalo:</h2>
                  <animated.p className="text-xl my-1 mb-2 text-center">{spring.val}</animated.p>
                  <small className="bg-red-500 text-white rounded-full px-2 py-1">aktualizováno každých 15 min.</small>
                </div>
                <div className="justify-self-center self-center">
                  <a href="/#petition"> <RiPenNibFill className="text-6xl text-red-400" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
