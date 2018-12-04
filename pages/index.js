import Layout from '~/layouts/default'
// import Logo from '~/components/logo'
// import Chat from '~/components/chat'
import { withI18n } from 'react-i18next'

// const LOGO_SIZE = 320

export default withI18n()(({ t }) => (
  <Layout>
    <article className="card card-1">
      <h1>
        {t(
          'A fistful of heroes striving to create a better world through better software.',
        )}
      </h1>
    </article>

    <style jsx global>{`
      .rsc,
      .rsc > .rsc-container {
        height: 100%;
      }

      .rsc > .rsc-container > .rsc-content {
        height: calc(100% - 51.5px - 8px);
      }
    `}</style>

    <style jsx>{`
      article {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }

      @media (min-width: 641px) {
        article {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    `}</style>
  </Layout>
))
