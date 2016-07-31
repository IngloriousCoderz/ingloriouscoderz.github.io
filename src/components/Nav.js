import React from 'react'
import {Link} from 'react-router'
import {navLinks} from '../../blog-config'

const navStyle = {
  textAlign: 'center'
}

const navLinkStyle = {
  paddingLeft: '.25em',
  paddingRight: '.25em'
}

const Nav = () => (
  <nav style={navStyle}>
    {navLinks.map(({url, title, target}) => (
      <Link key={url} to={target ? url : `/page/${url}`} target={target} style={navLinkStyle}>{title}</Link>
    ))}
  </nav>
)

export default Nav
