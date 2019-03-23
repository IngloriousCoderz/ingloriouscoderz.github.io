import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import Link from '~/components/link'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="what/speak" title="Speak" description="Let's talk about code.">
    <Trans>
      <article className="card card-1">
        <h1>Speak</h1>

        <p>
          Inglorious Coderz are damn good at developing software but also at
          communicating software. That's why 50% of our activity consists in
          teaching, training, mentoring, coaching, and public speaking in
          general.
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card
            title="Courses"
            image={require('~/static/images/what/speak/vulog.jpg')}>
            <p>
              Check the catalog right now!
              <br />
              <ExtLink to="/static/documents/Inglorious_Coderz_featured_courses_2019.pdf">
                English
              </ExtLink>
              {' | '}
              <ExtLink to="/static/documents/Inglorious_Coderz_catalogo_corsi_2019.pdf">
                Italian
              </ExtLink>
            </p>
            <p>
              One does not simply explain a technology. An effective course
              should enable all students to write quality code while
              understanding thoroughly the mechanics behind it.
            </p>
            <p>
              Our courses start from the code: students learn how to build a
              real-life application from the ground up, but every step is backed
              by strong theoretical concepts of software engineering and little
              trivia. This way no one gets left behind and no one gets bored
              waiting for the others to catch up.
            </p>
            <p>
              The above image shows the second edition of an advanced{' '}
              <ExtLink to="https://reactjs.org/">React</ExtLink> course
              performed for the French firm{' '}
              <ExtLink to="https://www.vulog.com/">Vulog</ExtLink>.
            </p>
            <p>
              Training companies such as{' '}
              <ExtLink to="http://codemotiontraining.com/">
                Codemotion Training
              </ExtLink>
              , <ExtLink to="http://www.forma-re-te.it/">forma-re-te</ExtLink>,
              and <ExtLink to="https://synesthesia.it/">Synesthesia</ExtLink>,{' '}
              also rely on us to provide the best courses on frameworks,
              software engineering, and project management.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Mentorship"
            image={require('~/static/images/what/speak/mentor.jpg')}>
            <p>
              There was an old commercial stating "Power is nothing without
              control". When people have a great potential but lack guidance,
              what they need is an authoritative figure to rely on. There's
              nothing worse than wasting potential because there is no one
              around giving the right support and motivation.
            </p>
            <p>
              Inglorious Coderz will be your technical lead and will{' '}
              <ExtLink to="https://en.wikipedia.org/wiki/Mentorship">
                mentor
              </ExtLink>{' '}
              you,{' '}
              <ExtLink to="https://en.wikipedia.org/wiki/Coaching">
                coach
              </ExtLink>{' '}
              you,{' '}
              <ExtLink to="https://en.wikipedia.org/wiki/Pair_programming">
                pair program
              </ExtLink>{' '}
              with you, until you'll be able to fly on your own wings.
            </p>
            <p>
              At present we mentor for the{' '}
              <ExtLink to="https://www.inacademy.eu/">
                European Innovation Academy
              </ExtLink>{' '}
              programs and for some hackathons organized by{' '}
              <ExtLink to="https://magazine.codemotion.com/">
                Codemotion
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Conferences"
            image={require('~/static/images/what/speak/apia.jpg')}>
            <p>
              It's hard to convey a message in 40 minutes or less. There's no
              time for introductions nor boring stuff. That's why every
              conference made by Inglorious Coderz is a thrilling rollercoaster,
              at the end of which the audience simply feels blown away.
            </p>
            <p className="text-right">
              <Link to="/what/speak/conferences">see all conferences›</Link>
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
