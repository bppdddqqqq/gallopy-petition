import React from "react"
import { Link } from "gatsby"

const Logo = function () {
  return (
    <div className="site-logo flex-row">
      <div className="logo-anim">
        <p>This place had over 2k people in it at one point. Now it's just stupid gen z memes and random women. There's a reason so many people left. I'm leaving too because this place is a literal waste of time. I'd say have a good one but I literally couldn't care less about any of you. Bye.
        </p>
      </div>
      <Link className="ted-icon center" to="/"><p>rekt.su</p></Link>
    </div>
  ) 
}

export default Logo