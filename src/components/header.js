/** @jsx jsx */
import { jsx } from 'theme-ui'

const Header = ({children}) => (
  <header 
    className={classNames}
    sx={{
      bg: 'secondary'
    }}
  >
    {children}
  </header>
)

let classNames = 'site-header '


export default Header