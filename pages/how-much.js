import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'

export default () => (
  <Layout>
    <article className="card card-1">
      <Trans>
        <h1>How Much</h1>

        <p>
          What an indelicate question. Well, of course our answer will be: it
          depends.
        </p>

        <p>
          The price for an Inglorious service ranges from €0 to €1600 a day.
          Yes, even zero! But unless you can provide some special visibility or
          you are an endangered species to save, it will be higher than that.
        </p>

        <p>
          So how much? Well, think about the highest price you are willing to
          pay. Ok now a little more.
        </p>
      </Trans>
    </article>
  </Layout>
)
