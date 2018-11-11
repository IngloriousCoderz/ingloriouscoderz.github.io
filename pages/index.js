import Layout from '~/layouts/default'
// import Logo from '~/components/logo'
// import Chat from '~/components/chat'
import { withI18n } from 'react-i18next'

// const LOGO_SIZE = 320

export default withI18n()(({ t }) => (
  <Layout>
    {/* <div className="logo-container">
      <Logo size={LOGO_SIZE} />
    </div> */}

    <article className="card card-1">
      <h1>
        {t(
          'A fistful of heroes striving to create a better world through better software.',
        )}
      </h1>
    </article>

    {/* <article className="chat">
      <Chat />
    </article> */}

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
        position: absolute;
        top: 50%;
        width: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      /*.logo-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
      }*/

      .chat {
        height: 100%;
        max-height: 602px;
      }
    `}</style>
  </Layout>
))
