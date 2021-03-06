import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import Link from '~/components/link'

export default () => (
  <Layout
    path="what"
    title="What"
    description="Which activities we are involved in."
  >
    <Trans>
      <article className="card card-1">
        <h1>What</h1>

        <p>
          Inglorious Coderz are involved in many activities. Have a look at some
          of them:
        </p>
      </article>

      <Row>
        <Column>
          <Card
            title="Code"
            image={require('~/static/images/what/code/fattutto.png')}
          >
            <p>Code is what we love, and it&apos;s what we do best.</p>
            <p className="text-right">
              <Link to="/what/code">see all projects›</Link>
            </p>
          </Card>
        </Column>

        <Column>
          <Card
            title="Speak"
            image={require('~/static/images/what/speak/apia.jpg')}
          >
            <p>
              We love developing software as much as we love developing people.
            </p>
            <p className="text-right">
              <Link to="/what/speak">see all speaking activities›</Link>
            </p>
          </Card>
        </Column>

        <Column>
          <Card
            title="Volunteer"
            image={require('~/static/images/what/volunteer/lampedusa_blood_sample.jpg')}
          >
            <p>Our main goal is to change the world for the better.</p>
            <p className="text-right">
              <Link to="/what/volunteer">see all volunteering activities›</Link>
            </p>
          </Card>
        </Column>

        <Column>
          <Card
            title="Community"
            image={require('~/static/images/what/community/king.jpg')}
          >
            <p>We can make it if we are in this together.</p>
            <p className="text-right">
              <Link to="/what/community">see details about the community›</Link>
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
