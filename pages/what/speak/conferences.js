import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout
    path="what/speak/conferences"
    title="Conferences"
    description="Talks and keynotes performed worldwide.">
    <Trans>
      <article className="card card-1">
        <h1>Conferences</h1>

        <p>
          One way to change the world is by inspiring people and hitting them
          with exciting pills of knowledge. Inglorious Coderz know how to choose
          a suitable subject and then convey the message in the most engaging,
          fun, and effective way.
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card
            title="React, The Inglorious Way"
            image={require('~/static/images/what/speak/react_inglorious_way.jpg')}>
            <p>
              "React, The Inglorious Way" is a 40 minute talk performed at{' '}
              <ExtLink to="https://events.codemotion.com/conferences/amsterdam/2019/">
                Codemotion Amsterdam 2019
              </ExtLink>
              . It is a highly technical talk performed as a live coding session
              that shows the perks and gotchas of common React patterns such as
              Container/Presentational, Higher-Order Components, Render Props,
              and Hooks.
            </p>
            <p>
              The slides, made with{' '}
              <ExtLink to="https://mdx-deck.jxnblk.com/">mdx-deck</ExtLink>, are
              available <ExtLink to="/react-the-inglorious-way">here</ExtLink>,
              while a PDF version can be downloaded{' '}
              <ExtLink to="/react-the-inglorious-way/presentation.pdf">
                here
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Refactoring Into React Hooks"
            image={require('~/static/images/what/speak/refactoring_react_hooks.jpg')}>
            <p>
              "Refactoring Into React Hooks" is a 40 minute talk performed at{' '}
              <ExtLink to="https://events.codemotion.com/conferences/rome/2019/">
                Codemotion Rome 2019
              </ExtLink>
              . It is a highly technical talk performed as a live coding session
              that shows how to turn your codebase into hooks starting from
              Class Components, Higher-Order components, Render Props, Context
              API, and much more.
            </p>
            <p>
              The slides, made with{' '}
              <ExtLink to="https://mdx-deck.jxnblk.com/">mdx-deck</ExtLink>, are
              available{' '}
              <ExtLink to="/refactoring-into-react-hooks">here</ExtLink>, while
              a PDF version can be downloaded{' '}
              <ExtLink to="/refactoring-into-react-hooks/presentation.pdf">
                here
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Technology 101 For Startupperz"
            image={require('~/static/images/what/speak/apia.jpg')}>
            <p>
              "Tech 101" is a 40 minute keynote requested by{' '}
              <ExtLink to="https://www.inacademy.eu/">
                European Innovation Academy
              </ExtLink>{' '}
              and performed in Turin, Shenzhen, and Doha. The slides, available
              on{' '}
              <ExtLink to="https://www.slideshare.net/InnovationAcademy/apia2018-antony-mistretta-tech-101?qid=80340f9c-4dd9-4933-85ef-938fa0a0a84b">
                Slideshare
              </ExtLink>
              , are funny hand-drawn doodles scanned and composed on Google
              Slides.
            </p>
            <p>
              <ExtLink to="https://youtu.be/Ox4k-lSEnFw">Here</ExtLink> is a
              video of the latest edition, courtesy of{' '}
              <ExtLink to="https://www.linkedin.com/in/iboyadzhieva/">
                Inna Boyadzhieva
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Sea Turtles"
            image={require('~/static/images/what/speak/lampedusa_sexy_turtles.jpg')}>
            <p>
              A 15-minute guided tour of the{' '}
              <ExtLink to="https://www.lampedusaturtlerescue.org/">
                Lampedusa Turtle Rescue Center
              </ExtLink>
              , with information about the different species of sea turtles,
              their lifecycle, their behavior, and the threats that they are
              facing because of humans.
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
