const Footer = () => (
  <footer>
    <p>
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
        target="_blank"
        rel="noopener noreferrer">
        <img
          alt="Licenza Creative Commons"
          src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png"
        />
      </a>{' '}
      The{' '}
      <a
        href="https://github.com/IngloriousCoderz"
        target="_blank"
        rel="noopener noreferrer">
        Inglorious Coderz
      </a>{' '}
      website is distributed with License{' '}
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
        target="_blank"
        rel="noopener noreferrer">
        Creative Commons Attribution - NonCommercial - NoDerivatives 4.0
        International
      </a>
      .
    </p>

    <style jsx>{`
      footer {
        font-size: small;
        text-align: center;
        padding: 1rem;
      }

      footer img {
        display: inline-block;
        margin: 0;
        border-radius: 0;
        vertical-align: middle;
      }
    `}</style>
  </footer>
)

export default Footer
