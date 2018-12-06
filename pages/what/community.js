import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="what/community" title="Community" description="">
    <article className="card card-1">
      <Trans>
        <h1>Community</h1>

        <p>
          The name "Inglorious Coderz" also stands for a community of code
          enthusiasts who used to meet every Sunday to experiment with the
          latest technologies, apply them to interesting projects and share
          know-how, internally or to the world, contributing to open source
          projects or holding high-tech talks in dedicated events.
        </p>

        <p>
          Nowadays we hardly meet live because of everyone's commitments and
          geographical dislocation, but there is still a thriving{' '}
          <ExtLink to="https://ingloriouscoderz.slack.com">
            Slack workspace
          </ExtLink>{' '}
          in which we perform various activities:
        </p>

        <ul>
          <li>We share interesting links and documentation;</li>
          <li>We help each other solving problems;</li>
          <li>We share ideas for some new project or startup company;</li>
          <li>We share interesting job offers;</li>
          <li>We have fun and joke around.</li>
        </ul>

        <p>
          The community can also act as a pool of professionals to draw on to
          expand the company. This is why not everyone is admitted: only those
          who show a particular interest and affinity with the values ​​of
          Inglorious Coderz are invited to participate. If you are one of those,
          drop an email <a href="mailto:antony.mistretta@gmail.com">here</a>.
        </p>
      </Trans>
    </article>
  </Layout>
)
