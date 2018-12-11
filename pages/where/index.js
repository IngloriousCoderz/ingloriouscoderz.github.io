import dynamic from 'next/dynamic'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

const Map = dynamic(() => import('./map'), { ssr: false })

export default () => (
  <Layout path="where" title="Where" description="">
    <article className="card card-1">
      <h1>Where</h1>

      <p>
        The Inglorious Headquarters are based in Turin, Italy, but we can
        operate worldwide, remotely or on site.
      </p>

      <div className="map-container">
        <Map />
      </div>

      <p>You can find us online too:</p>
    </article>

    <Row>
      <Column>
        <Card title="Github">
          <p>Our contributions to open source.</p>
          <p className="text-right">
            <ExtLink to="https://github.com/IngloriousCoderz/">
              go to our Github page›
            </ExtLink>
          </p>
        </Card>
      </Column>

      <Column>
        <Card title="Instagram">
          <p>Some pictures about our most relevant updates.</p>
          <p className="text-right">
            <ExtLink to="https://www.instagram.com/ingloriouscoderz/">
              go to our Instagram page›
            </ExtLink>
          </p>
        </Card>
      </Column>

      <Column>
        <Card title="Facebook">
          <p>Same as Instagram, but also some cool links and nerdy jokes.</p>
          <p className="text-right">
            <ExtLink to="https://www.facebook.com/IngloriousCoderz/">
              go to our Facebook page›
            </ExtLink>
          </p>
        </Card>
      </Column>

      <Column>
        <Card title="LinkedIn">
          <p>Not used at present, but who knows in the future? Stay tuned!</p>
          <p className="text-right">
            <ExtLink to="https://www.linkedin.com/company/inglorious-coderz/">
              go to our LinkedIn page›
            </ExtLink>
          </p>
        </Card>
      </Column>
    </Row>

    <style jsx>{`
      .map-container {
        height: 300px;
        margin-bottom: 1rem;
      }
    `}</style>
  </Layout>
)
