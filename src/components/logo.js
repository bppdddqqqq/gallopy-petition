import React from "react"
import { Link } from "gatsby"

const Logo = function () {
  return (
    <div className="site-logo flex-row">
      <div className="logo-anim">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores inventore libero optio enim quas totam possimus labore architecto voluptates accusamus ex in aspernatur earum vel quae, aliquid harum eos ad.
        </p>
      </div>
      <Link className="ted-icon center" to="/"><p>rekt.su</p></Link>
    </div>
  ) 
}

export default Logo