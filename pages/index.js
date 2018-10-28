import Link from 'next/link'

import Layout from '../layouts/Default'
// import Logo from '../components/Logo'
import Chat from '../components/Chat'

const LOGO_SIZE = 320

const Index = () => (
  <Layout isHome={true}>
    {/* <div className="logo-container">
      <Logo size={LOGO_SIZE} />
    </div> */}

    <div className="chat">
      <Chat />
    </div>

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
)

export default Index
