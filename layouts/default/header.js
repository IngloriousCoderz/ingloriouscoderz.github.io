import Link from '~/components/link'

import Logo from '~/components/logo'
import Button from '~/components/button'

const links = [
  { id: 'why', title: 'Why' },
  { id: 'who', title: 'Who' },
  { id: 'what', title: 'What' },
  { id: 'how', title: 'How' },
  { id: 'when', title: 'When' },
  { id: 'where', title: 'Where' },
  { id: 'how-much', title: 'How Much' },
  { id: 'logo', title: 'Logo' },
  { id: 'blog', title: 'Blog' },
]

export default ({ wallpaper }) => (
  <header>
    <h1>
      <Link to="/">
        <div className="title">
          <div>
            <span>Inglorious</span>
            <span className="shade">&nbsp;</span>
          </div>
          <Logo />
          <div>
            <span>Coderz</span>
            <span className="shade">&nbsp;</span>
          </div>
        </div>
      </Link>
    </h1>

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

      header > h1 {
        font-size: 2rem;
      }

      @media (max-width: 640px) {
        header > h1 {
          font-size: 1rem;
        }
      }

      header > h1 .title {
        font-family: 'Ethnocentric';
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
)
