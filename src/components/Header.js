import React from 'react'
import {Link} from 'react-router'
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
        <img src='/images/logo.png' alt='logo' width={32} style={logoStyle} />
        {' '}Inglorious Coderz{' '}
      </Link>
      <small>Salvare il mondo una riga di codice alla volta.</small>
    </h3>
    <Nav/>
  </header>
)

export default Header
