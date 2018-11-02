import Link from 'next/link'

import wallpaper from './metal-wallpaper.jpg'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

const links = [
  // { id: 'uh', title: 'Uh?' },
  { id: 'why', title: 'Why' },
  { id: 'who', title: 'Who' },
  { id: 'how', title: 'How' },
  { id: 'what', title: 'What' },
  { id: 'when', title: 'When' },
  { id: 'where', title: 'Where' },
  // { id: 'help', title: 'Help' },
  // { id: 'so', title: 'So?' },
  // { id: 'yuk', title: 'Yuk' },
  { id: 'blog', title: 'Blog' },
  {
    id: 'github',
    title: 'Github',
    href: 'https://github.com/IngloriousCoderz',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]

const Header = () => (
  <header>
    <h1>
      <Link href="/">
        <a>
          <span>Inglorious</span>
          <Logo size={64} />
          <span>Coderz</span>
        </a>
      </Link>
    </h1>

    <p>
      A fistful of heroes striving to create a better world through better
      software.
    </p>

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
        padding: 1rem;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      header > h1 {
        margin: 0;
      }

      header > h1 > a {
        color: #666;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: 4fr 1fr 4fr;
      }

      @media (max-width: 640px) {
        header > h1 > a {
          font-size: 1rem;
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
)

export default Header