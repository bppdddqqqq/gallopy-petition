import React, { useState } from 'react'

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
  const sendToRest = (data) => {
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event, form)

    if (!form.agreed) {
      setError("Neodsouhlasili jste podminky o spracovavani osobnich udaju")
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
    if (!form.email || !form.confirmemail || form.email != form.confirmemail) {
      setError('Nesprávní mailová adresa')
      return;
    }
    setError("")
    setUploaded(true)
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

  return (
    <div className=''>
      <button className="" onClick={() => setView(!view)}>Podepsat</button>
      <div className={"mt-8 p-2 border-2 border-dashed "+(view || uploaded ? "block" : "hidden")}>
        <div className={(view && !uploaded ? "block" : "hidden")}>
          <div className={'bg-red-500 p-4 text-white mb-4 ' + (error != '' ? 'block' : 'hidden')}>
            {error}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
            <label className="text-sm font-normal mb-2">
              <input type="checkbox" name="consent" value={form.consent} onChange={handleChange} />
              Souhlasím s tím, aby údaje formuláře byly zveřejněny online v rozsahu jméno, příjmení a povolání na stránkach iniciativy Scala do Scaly.
            </label>
            <label className='text-sm font-normal mb-4'>
              <input type="checkbox" name="agreed" value={form.agreed} onChange={handleChange} />
              Souhlasím s podmínkami o Spracovávaní osobních údajů
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className={"py-6 " + (uploaded ? "block" : "hidden")}>
          <h1 className="text-black">Petice odeslána. Byl odeslán potvrzovací e-mail na nastavenou adresu pro ověření, e-mail může být nalezen ve spamu.</h1>
        </div>
      </div>
    </div>
  )
}

export default Petition