import { Trans } from 'react-i18next'

import ExtLink from '~/components/ext-link'

export default () => (
  <footer>
    <Trans>
      <ExtLink to="https://creativecommons.org/licenses/by-nc-nd/4.0/">
        <img
          alt="Licenza Creative Commons"
          src={require('~/static/images/license.png')}
        />
      </ExtLink>{' '}
      INGLORIOUS CODERZ DI MISTRETTA MATTEO ANTONY | 39 Via Val Della Torre,
      10149 Torino (TO) | VAT Code IT11524720015 | Tax Code MSTMTN82R17H501A
    </Trans>

    <style jsx>{`
      footer {
        background: black;
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
