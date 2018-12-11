import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout
    path="what/volunteer"
    title="Volunteer"
    description="The world is not going to get better with just code.">
    <Trans>
      <section className="card card-1">
        <h1>Volunteer</h1>
        <p>
          The purpose of Inglorious Coderz is to build a better world. But let's
          face it, code by itself will not suffice. That's why we are also first
          in line when dealing with volunteering. Part of the money we earn is
          not just spent on charity, it allows us to take action directly.
        </p>
      </section>

      <Row>
        <Column max={2}>
          <Card
            title="Lampedusa Turtle Group"
            image={require('~/static/images/what/volunteer/lampedusa_bath.jpg')}>
            <p>
              Sea ​​turtles are not only beautiful animals, but they are
              essential for the marine ecosystem because they are greedy for
              jellyfish, which threatens our oceans due to their exponentially
              increasing number.
            </p>
            <p>
              Although a sea turtle's lifespan could reach 150 years or more,
              many of them die way earlier due to human interference: fishing
              nets, hooks, trash, global warming, ... We must start to behave
              responsibly towards our environment, and we have to do it quick.
            </p>
            <p>
              <ExtLink to="http://www.lampedusaturtlerescue.org/">
                Lampedusa Turtle Group
              </ExtLink>{' '}
              is a research center, a hospital, and a museum related to sea
              turtles guided by an amazing human being, Dr.{' '}
              <ExtLink to="http://www.lampedusaturtlerescue.org/daniela-freggi">
                Daniela Freggi
              </ExtLink>
              . Inglorious Coderz spent two weeks, together with other
              volunteers from all over the world, performing various activities
              &mdash; manual work such as cleaning up the center, the turtles,
              and their pools every two mornings, but also assisting
              veterinarian surgeons and guiding visitors through the museum and
              raising awareness.
            </p>
          </Card>
        </Column>

        {/* <Column max={3}>
          <Card
            title="Developers Italia"
            image={require('~/static/images/what/volunteer/developers_italia.png')}>
            <p></p>
          </Card>
        </Column> */}

        <Column max={2}>
          <Card
            title="More to come..."
            image={require('~/static/images/what/volunteer/lampedusa_dynamic_duo.jpg')}>
            <p>
              We are just started yet. We hope to fill this page with many more
              volunteering activities as soon as possible.
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
