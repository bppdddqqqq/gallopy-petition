import React from 'react'

const Footer = () => (
  <footer
    className="py-8 text-white bg-black"
  >
    <div className="container grid grid-cols-3 mx-auto">
      <div className="col-span-1">
        <h1 className='text-left'>Iniciativa Za Scalu v Scale</h1>
        <p>Sitemapa tu</p>
      </div>
      <div className="col-span-2">
        <h1 className='text-left'>Kontakty</h1>
        <div className='grid grid-cols-2 mt-4'>
          <div><p>Kontakty tu</p></div>
          <div><p>Kontakty tu</p></div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer