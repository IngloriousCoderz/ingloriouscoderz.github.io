import React from 'react'

const licenseStyle = {
  display: 'inline-block',
  margin: 0,
  borderRadius: 0,
  verticalAlign: 'middle'
}

const Footer = () => (
  <footer className="footer">
    <small>
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt="Licenza Creative Commons"
          style={licenseStyle}
          src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png"
        />
      </a>{' '}
      Il sito degli{' '}
      <a
        href="https://github.com/IngloriousCoderz"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inglorious Coderz
      </a>{' '}
      è distribuito con Licenza{' '}
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Creative Commons Attribuzione - Non commerciale - Non opere derivate 4.0
        Internazionale
      </a>.
    </small>
  </footer>
)

export default Footer
