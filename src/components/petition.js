import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../global';
import { Link } from 'gatsby'

const Petition = () => {
  const [view, setView] = useState(false)
  const [error, setError] = useState('')
  const [uploaded, setUploaded] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    job: '',
    city: '',
    confirmemail: '',
    consent: '',
    agreed: '',
  })
  const sendToRest = () => {
    const packet = new FormData();
    // console.log(form, form.consent)
    packet.append("firstname", form.firstname)
    packet.append("lastname", form.lastname)
    packet.append("email", form.email)
    packet.append("job", form.job)
    packet.append("city", form.city)
    packet.append("consent", form.consent ? '1' : '0')

    fetch(`${SERVER_URL}/sign`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: packet,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data === 'ok') {
        setUploaded(true)
      } else {
        setError(data)
      }
    }).catch((data) => {
      setError(data.message)
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event, form)

    if (!form.agreed) {
      setError("Neodsouhlasili jste podmínky o zpracování osobních údajů")
      return;
    }
    if (!form.firstname) {
      setError('Chybí jméno')
      return;
    }
    if (!form.lastname) {
      setError('Chybí příjmení')
      return;
    }
    if (!form.job) {
      setError('Chybí povolání')
      return;
    }
    if (!form.city) {
      setError('Chybí město')
      return;
    }
    if (!form.email || !form.confirmemail || form.email !== form.confirmemail) {
      setError('Nesprávná e-mailová adresa')
      return;
    }
    setError("")
    sendToRest()
  }
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value
    });
  }

  useEffect(() => {
    if (document.URL.endsWith('#petition')) {
      setView(true)
    }
  })

  return (
    <div className='text-center'>
      <button className="" onClick={() => setView(!view)}>Podepsat</button>
      <div className={"mt-8 p-2 border-2 border-dashed text-left bg-white w-fit "+(view || uploaded ? "block" : "hidden")}>
        <div className={(view && !uploaded ? "block" : "hidden")}>
          <div className={'bg-red-500 p-4 text-white mb-4 ' + (error !== '' ? 'block' : 'hidden')}>
            {error}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
              <label>
                Jméno:
                <input type="text" name="firstname" value={form.firstname} onChange={handleChange} />
              </label>
              <label>
                Příjmení:
                <input type="text" name="lastname" value={form.lastname} onChange={handleChange} />
              </label>
              <label>
                Povolání:
                <input type="text" name="job" value={form.job} onChange={handleChange} />
              </label>
              <label>
                Město:
                <input type="text" name="city" value={form.city} onChange={handleChange} />
              </label>
              <label className="col-start-1 col-end-1">
                E-mail:
                <input type="text" name="email" value={form.email} onChange={handleChange} />
              </label>
              <label>
                Potvrdit e-mail:
                <input type="text" name="confirmemail" value={form.confirmemail} onChange={handleChange} />
              </label>
            </div>
            <label className="mb-2 text-sm font-normal">
              <input type="checkbox" name="consent" value={form.consent} onChange={handleChange} />
              Souhlasím s tím, aby údaje formuláře byly zveřejněny online v rozsahu jméno, příjmení, povolání a města na stránkach iniciativy Scala ve Scale.
            </label>
            <label className='mb-4 text-sm font-normal'>
              <input type="checkbox" name="agreed" value={form.agreed} onChange={handleChange} />
              Souhlasím s podmínkami o <Link to="/podminky"><u>Zpracovávaní osobních údajů</u></Link> (<b>Povinné</b>)
            </label>

            <input type="submit" value="Odevzdat" />
          </form>
        </div>
        <div className={"py-6 px-4 " + (uploaded ? "block" : "hidden")}>
          <h1 className="text-black text-left text-1xl">Děkujeme za podporu naší petice a zejména za podporu kina Scala! Na Vaši e-mailovou adresu jsme odeslali ověřovací e-mail, kterým svůj hlas v petici potvrdíte. Pokud jej nevidíte, může se nacházet ve spamu.</h1>
        </div>
      </div>
    </div>
  )
}

export default Petition
