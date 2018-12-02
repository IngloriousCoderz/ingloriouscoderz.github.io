import Link from '~/components/link'
import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Card from '~/components/vertical-card'

export default () => (
  <Layout>
    <Trans>
      <section className="card card-1">
        <h1>What</h1>

        <p>There are many activities involved. Have a look at what we do:</p>
      </section>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Card
            title="Code"
            image={require('~/static/images/what/code/fattutto.png')}>
            <p>Code is what we love, and it's what we do best.</p>
            <Link to="/what/code">see all projects</Link>
          </Card>
        </div>

        <div className="col-xs-12 col-md-6">
          <Card
            title="Speak"
            image={require('~/static/images/what/speak/apia.jpg')}>
            <p>
              We love developing software as much as we love developing people.
            </p>
            <Link to="/what/speak">see all speaking activities</Link>
          </Card>
        </div>

        <div className="col-xs-12 col-md-6">
          <Card
            title="Volunteer"
            image={require('~/static/images/what/volunteer/lampedusa_blood_sample.jpg')}>
            <p>We are here to change the world for the better.</p>
            <Link to="/what/volunteer">see all volunteering activities</Link>
          </Card>
        </div>

        <div className="col-xs-12 col-md-6">
          <Card
            title="Community"
            image={require('~/static/images/what/community/king.jpg')}>
            <p>We can make it if we do it together.</p>
            <Link to="/what/community">see details about the community</Link>
          </Card>
        </div>
      </div>
    </Trans>
  </Layout>
)
