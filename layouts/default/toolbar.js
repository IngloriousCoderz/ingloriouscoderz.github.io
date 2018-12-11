import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

import i18n from '~/utils/i18n'
import Button from '~/components/button'

const changeLanguage = language => event => {
  event.preventDefault()
  i18n.changeLanguage(language)
}

export default () => (
  <div className="toolbar">
    <div>
      <Button
        href="https://github.com/IngloriousCoderz/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </Button>
      <Button
        href="https://www.instagram.com/ingloriouscoderz/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </Button>
      <Button
        href="https://www.facebook.com/IngloriousCoderz/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} />
      </Button>
      <Button
        href="https://www.linkedin.com/company/inglorious-coderz/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} />
      </Button>
    </div>

    <div>
      <Button to="/privacy-policy">Privacy</Button>
    </div>

    {/* <div>
      <Button to="#" onClick={changeLanguage('it')}>
        it
      </Button>
      <Button to="#" onClick={changeLanguage('en')}>
        en
      </Button>
    </div> */}

    <style jsx>{`
      .toolbar {
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
      }

      .toolbar > div {
        display: flex;
      }
    `}</style>
  </div>
)
