import Layout from '~/layouts/default'
import { withI18n } from 'react-i18next'

export default withI18n()(({ t }) => (
  <Layout path="" title="Home" description="">
    <article className="card card-1">
      <h1>
        {t(
          'A fistful of heroes striving to create a better world through better software.'
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
        align-self: center;
        text-align: center;
      }
    `}</style>
  </Layout>
))
