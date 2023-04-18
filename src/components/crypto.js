import React from 'react'
import AES from "crypto-js/aes"
import Enc from "crypto-js/enc-utf8"
import { Component } from "react"
//1a2eb2d1-867e-4280-8598-5afcb5f5618b


if (typeof window !== 'undefined') {
  window.AES = AES
  window.Enc = Enc
}

class App extends Component {
  constructor() {
    super()
    this.state = { loaded: false, redirectUrl: null }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const pth = urlParams.get("path")
    const key = urlParams.get("key")
    if (!pth) {
      this.setState({loaded: true})
      return;
    }

    fetch(`/json/${pth}.json?nonce=14ab4f`)
    .then(res => res.json())
    .then(value => {
      try {
        console.log('abc')

        if (Date.now() < value.valid) {
          throw Error()
        }

        var x = AES.decrypt(value.data, key)
        this.setState({redirectUrl: x.toString(Enc)})
      } catch {
        this.setState({redirectUrl: null})
      }
      this.setState({loaded: true})
    })
    .catch(() => {
      this.setState({loaded: true})
    })
  }

  render() {
    if (this.state.loaded) {
      if (this.state.redirectUrl) {
        setTimeout(() => {
          window.location.replace(this.state.redirectUrl)
        }, 3000)
        return (
          <div className="border-padded">
            <p>Odkaz autorizován, redirekce se spustí za 3 sekundy...</p>
            <p>
              Pokud to nefunguje, skuste{" "}
              <a href={this.state.redirectUrl} target="_blank" rel="noreferrer">
                kliknout tady
              </a>
              .
            </p>
          </div>
        )
      } else {
        return (
          <div className="border-padded">
            <p>Chyba, odkaz není aktivní nebo autorizován.</p>
          </div>
        )
      }
    } else {
      return (
        <div className="border-padded">
          <p>Načítání...</p>
        </div>
      )
    }
  }
}

export default App
