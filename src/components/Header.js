import React from 'react'
import {Link} from 'react-router'
import Logo from './Logo'
import Nav from './Nav'

const logoStyle = {
  display: 'inline-block',
  margin: 0,
  verticalAlign: 'middle'
}

const Header = () => (
  <header className='masthead'>
    <h3 className='masthead-title'>
      <Link to='/'>
        <Logo size={32} style={logoStyle} />
        {' '}Inglorious Coderz{' '}
      </Link>
      <div style={{textAlign: 'right'}}>
        <small>Salvare il mondo una riga di codice alla volta.</small>
      </div>
    </h3>
    <Nav/>
  </header>
)

export default Header
