import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../global';
import { Link } from 'gatsby'
import IsEmail from 'validator/lib/isEmail';

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

  const cleanForm = (obj) => {
    const res = {};
    res.firstname = obj.firstname.trim();
    res.lastname = obj.lastname.trim();
    res.email = obj.email.trim();
    res.job = obj.job.trim();
    res.city = obj.city.trim();
    res.confirmemail = obj.confirmemail.trim();
    res.consent = obj.consent;
    res.agreed = obj.agreed;

    return res;
  }
  const sendToRest = () => {
    const packet = new FormData();
    const newForm = cleanForm(form)
    // console.log(form, form.consent)
    packet.append("firstname", newForm.firstname)
    packet.append("lastname", newForm.lastname)
    packet.append("email", newForm.email)
    packet.append("job", newForm.job)
    packet.append("city", newForm.city)
    packet.append("consent", newForm.consent ? '1' : '0')

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

    const newForm = cleanForm(form)

    if (!newForm.agreed) {
      setError("Neodsouhlasili jste podmínky o zpracování osobních údajů")
      return;
    }
    if (!newForm.firstname) {
      setError('Chybí jméno')
      return;
    }
    if (!newForm.lastname) {
      setError('Chybí příjmení')
      return;
    }
    if (!newForm.job) {
      setError('Chybí povolání')
      return;
    }
    if (!newForm.city) {
      setError('Chybí město')
      return;
    }
    if (IsEmail(newForm.firstname) || IsEmail(newForm.lastname) || IsEmail(newForm.job) || IsEmail(newForm.city)) {
      setError('Emailová adresa napsaná v nesprávnem políčku')
      return;
    }
    if (!newForm.email || !newForm.confirmemail || newForm.email !== newForm.confirmemail || !IsEmail(newForm.email)) {
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
      <div className="flex flex-wrap gap-4 justify-center">
          <button className={uploaded ? "hidden" : "block"} onClick={() => setView(!view)}>Podepsat</button>
        <a href="https://www.facebook.com/sharer.php?u=https://scalavescale.cz/" target="_blank" rel="noreferrer"><button>Sdílet na Facebook</button></a>
      </div>
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
          <h1 className="text-black text-left text-1xl">Děkujeme za podporu naší petice a zejména za podporu kina Scala!</h1>
          <p className="text-lg text-left text-black">Na Vaši <b>e-mailovou adresu</b> jsme <b>odeslali ověřovací e-mail</b>, kterým <b>svůj hlas v petici potvrdíte</b>. Pokud jej nevidíte, může se nacházet ve spamu.</p>
          <p className="text-md text-left text-red-400">Rádi bychom připomněli, že online podpis je bohužel právně nezávazny. Budeme proto rádi, když podpoříte petici podpisem i v její papírové formě.</p>
        </div>
      </div>
    </div>
  )
}

export default Petition
