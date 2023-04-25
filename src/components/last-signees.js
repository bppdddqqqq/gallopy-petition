import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../global';

const LastSignees = () => {
  let [signees, setSignees] = useState(null)
  useEffect(() => {
    if (signees != null) {
      return;
    }
    fetch(`${SERVER_URL}/names`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
      setSignees(JSON.parse(data))
    });
  })

  if (signees === null) {
    return (<></>);
  }
  const Dup = ({className=''}) => (
    <div className={"py-8 whitespace-nowrap "+className}>
      {signees.map(({firstname, lastname, job}) => <span> {firstname} {lastname} <span className="text-2xl align-super">({job})</span> </span>)}
    </div>
  )
  return (
    <>
      <h1 className="mt-24">Kino Scala podpořili například:</h1>
      <div className="relative flex overflow-x-hidden text-4xl">
        <Dup className="animate-marquee"/>
        <Dup className="animate-marquee2 top-0 absolute"/>
      </div>
    </>
  )
}

export default LastSignees
