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
            title="New Technologies"
            image={require('~/static/images/what/speak/new_technologies.jpg')}>
            <p>
              The{' '}
              <ExtLink to="https://www.inacademy.eu/italy-old/">
                European Innovation Academy 2019 in Turin
              </ExtLink>{' '}
              involved me more than usual this time: apart from taking the role
              of Head Of Mentors, I gave two speeches before the crowd of
              students, teachers, and mentors.
            </p>
            <p>
              The picture below refers to a slide from the keynote "New
              Technologies" which, according to one of the Program Managers, was
              "a mix of frontier technologies, memes, gifs and fundamental
              thoughts about the future – it is captivating, fun and
              thought-provoking".
            </p>
            <p>
              Slides are available{' '}
              <ExtLink to="https://docs.google.com/presentation/d/16i5LKo5tY6aoKUX7xy_9zTUPgw2CMSAnD6arEnTVxyM/">
                here
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="CTO Bootcamp"
            image={require('~/static/images/what/speak/cto_bootcamp.jpg')}>
            <p>
              <ExtLink to="https://www.codemotion.com/">Codemotion</ExtLink> in
              collaboration with{' '}
              <ExtLink to="https://www.facebook.com/">Facebook</ExtLink>{' '}
              organized a series of webinars Technology Officer.
            </p>
            <p>
              The 3.5 hours speech on Tech Team Management covered different
              topics, such as the role as the CTO as a technical lead, metrics,
              software lifecycle, eXtreme Programming and Test-Driven
              Development, being a project manager, and license management.{' '}
            </p>
            <p>
              The outcome was an{' '}
              <ExtLink to="https://www.ryadel.com/en/codemotion-from-developer-to-cto-tech-leadership-training-course-day-one/">
                enthusiastic feedback
              </ExtLink>
              , which was then{' '}
              <ExtLink to="https://www.codemotion.com/magazine/codemotion-tech-leadership-training-boot-camp-review-1-of-2-5150">
                officially scaled down
              </ExtLink>{' '}
              for some reason. But you know it, we don't do it for the glory ;)
            </p>
            <p>
              Slides are available{' '}
              <ExtLink to="https://docs.google.com/presentation/d/1ThCBbvSC4Dp53eFf84cqUfytggI7pK_MpQlBFHMJDM8/">
                here
              </ExtLink>
              .
            </p>
          </Card>
        </Column>

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
      </Row>

      <Row>
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
