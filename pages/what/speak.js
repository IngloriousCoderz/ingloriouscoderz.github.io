import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="what/speak" title="Speak" description="">
    <Trans>
      <section className="card card-1">
        <h1>Speak</h1>

        <p>
          Inglorious Coderz are damn good at developing software but also at
          communicating software. That's why 50% of our activity consists in
          teaching, training, mentoring, coaching, and public speaking in
          general.
        </p>
      </section>

      <Row>
        <Column max={3}>
          <Card
            title="Courses"
            image={require('~/static/images/what/speak/vulog.jpg')}>
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
              <ExtLink to="https://reactjs.org/">React</ExtLink> course starting
              at <ExtLink to="https://www.vulog.com/">Vulog</ExtLink>.
            </p>
            <p>
              Training companies such as{' '}
              <ExtLink to="http://codemotiontraining.com/">
                Codemotion Training
              </ExtLink>
              , <ExtLink to="http://www.forma-re-te.it/">forma-re-te</ExtLink>,
              and <ExtLink to="https://synesthesia.it/">Synesthesia</ExtLink>{' '}
              also rely on us to provide the best courses on{' '}
              <ExtLink to="https://reactjs.org/">React</ExtLink>,{' '}
              <ExtLink to="https://vuejs.org/">Vue.js</ExtLink>,{' '}
              <ExtLink to="https://angular.io/">Angular</ExtLink>,{' '}
              <ExtLink to="https://git-scm.com/">Git</ExtLink>,{' '}
              <ExtLink to="https://spring.io/">Spring</ExtLink>,
              <ExtLink to="http://hibernate.org/">Hibernate</ExtLink>,{' '}
              <ExtLink to="https://struts.apache.org/">Struts</ExtLink>, and{' '}
              <ExtLink to="https://blog.cleancoder.com/">Clean Code</ExtLink>.
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

            <p>
              What you see here is "Technology 101 for startupperz", a 40 minute
              talk performed in Shenzhen for the{' '}
              <ExtLink to="https://www.inacademy.eu/">
                European Innovation Academy
              </ExtLink>
              . The slides, available on{' '}
              <ExtLink to="https://www.slideshare.net/InnovationAcademy/apia2018-antony-mistretta-tech-101?qid=80340f9c-4dd9-4933-85ef-938fa0a0a84b">
                Slideshare
              </ExtLink>
              , are made as funny hand-drawn doodles.
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
