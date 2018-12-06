import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'

export default () => (
  <Layout
    path="when"
    title="When"
    description="In every phase of your business' lifecycle, Inglorious Coderz is there to be your perfect tech ally.">
    <Trans>
      <article className="card card-1">
        <h1>When</h1>

        <p>
          In every phase of your business' lifecycle, Inglorious Coderz is there
          to be your perfect tech ally.
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card title="Startups">
            <p>
              An awesome idea is the starting point for your business, but then
              you have to build the real thing. That's when you realize you're
              really putting your future in someone else's hands. Just make sure
              the person you're relying on is able to develop a robust
              foundation for your product.
            </p>
            <p>
              Inglorious Coderz can help in many ways, from assessing your CTO's
              skills to mentoring your devs, or even taking on the role of your
              first CTO.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Small Businesses">
            <p>
              As a small business you know you need an online presence. Also, do
              you find yourself wasting too much time doing small tasks by hand
              every day? That's a hint that you need some automation in your
              work life.
            </p>
            <p>
              Inglorious Coderz can provide you solutions built from scratch so
              that they are tailored to your needs and yours only. Websites are
              blazingly fast because they do not rely on some Wordpress, and
              have a unique design because they are not built from templates.
              Management software, mobile apps and web applications do exactly
              what you needed, but better.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Big Companies">
            <p>
              Being in the industry for a while, you already know how IT
              consulting works: you pay for a senior and you get a junior that
              lied on her/his CV. Wouldn't it be better to employ people and
              keep the know-how in-house? Definitely. But then, who is going to
              train them? Who is going to give them best practices and standards
              to follow? Who is going to address those hard problems that they
              cannot solve?
            </p>
            <p>The answer to all three is: Inglorious Coderz.</p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
