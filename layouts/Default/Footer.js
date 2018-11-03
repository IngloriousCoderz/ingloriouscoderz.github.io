import { withI18n } from 'react-i18next'
import { Trans } from 'react-i18next'

import ExtLink from '../../components/ExtLink'

const Footer = ({ t }) => (
  <footer>
    <p>
      <Trans>
        <ExtLink to="https://creativecommons.org/licenses/by-nc-nd/4.0/">
          <img
            alt="Licenza Creative Commons"
            src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png"
          />
        </ExtLink>{' '}
        The{' '}
        <ExtLink to="https://github.com/IngloriousCoderz">
          Inglorious Coderz
        </ExtLink>{' '}
        website is distributed with{' '}
        <ExtLink to="https://creativecommons.org/licenses/by-nc-nd/4.0/">
          Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
          International
        </ExtLink>{' '}
        Public License.
      </Trans>
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

export default withI18n()(Footer)
