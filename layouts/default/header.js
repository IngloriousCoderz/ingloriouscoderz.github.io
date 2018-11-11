import Link from 'next/link'
import { withI18n } from 'react-i18next'

import wallpaper from '~/static/images/metal-wallpaper.jpg'
import Logo from '~/components/logo'
import Button from '~/components/button'

const links = [
  { id: 'why', title: 'Why' },
  { id: 'who', title: 'Who' },
  { id: 'how', title: 'How' },
  { id: 'what', title: 'What' },
  { id: 'when', title: 'When' },
  { id: 'where', title: 'Where' },
  { id: 'blog', title: 'Blog' },
  {
    id: 'github',
    title: 'Github',
    href: 'https://github.com/IngloriousCoderz',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]

export default withI18n()(({ t }) => (
  <header>
    <h1>
      <Link href="/">
        <a>
          <div>
            <span>Inglorious</span>
            <span className="shade">&nbsp;</span>
          </div>
          <Logo size={64} />
          <div>
            <span>Coderz</span>
            <span className="shade">&nbsp;</span>
          </div>
        </a>
      </Link>
    </h1>

    {/* <p>
      {t(
        'A fistful of heroes striving to create a better world through better software.',
      )}
    </p> */}

    <nav>
      {links.map(link => (
        <Button key={link.id} {...link} />
      ))}
    </nav>

    <style jsx>{`
      header {
        background: black;
        background-image: url(${wallpaper});
        background-position-x: center;
        background-attachment: fixed;
        margin-bottom: 1rem;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      // header > h1 {
      //   clear: both;
      //   margin: 0;
      //   margin-bottom: 1rem;
      // }

      header > h1 > a {
        color: #666;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 4fr 1fr 4fr;
      }

      .shade {
        position: relative;
        margin: -1.5rem 0 0;
        padding: 0;
        display: block;
        background: #111;
        width: 100%;
        height: 1.5rem;
        opacity: 0.25;
        text-align: center;
      }

      @media (max-width: 640px) {
        .shade {
          margin: -0.75rem 0 0;
          height: 1rem;
        }
      }

      header > p {
        text-align: center;
        margin: 0.5rem;
      }

      nav {
        text-align: center;
        display: flex;
        flex-wrap: wrap;
      }
    `}</style>
  </header>
))
