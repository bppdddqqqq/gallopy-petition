/** @jsx jsx */
import { jsx } from 'theme-ui'
import { RiArrowDownLine } from "react-icons/ri";

const Hero = ({children}) => (
  <div
    className="hero-element"
  >
    {children}
    <span className="down-button"><RiArrowDownLine />Scroll dolu pro více</span>
  </div>
)


export default Hero