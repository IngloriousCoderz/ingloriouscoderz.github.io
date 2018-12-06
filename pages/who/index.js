import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import Link from '~/components/link'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="who" title="Who" description="">
    <Trans>
      <article className="card card-1">
        <h1>Who</h1>

        <p>
          Inglorious Coderz is a software house based in Turin and also a small
          community with members spread all over Europe.
        </p>

        <p>
          Currently Inglorious Coderz as a firm is a one-man army, which means
          there's only one person behind everything. It's-a me,{' '}
          <ExtLink to="/static/resumes/CV-Europass-20170418-Mistretta-EN.pdf">
            Matteo Antony
          </ExtLink>
          ! You can consider me as a freelance, but I'm planning to expand
          myself soon.
        </p>

        <p>
          So, instead of the people, let's focus on the roles for now. You can
          hire me for different kinds of activities with different degrees of
          involvement. Of course I can wear multiple hats at the same time, but
          you will pay for just one guy! How cool is that?
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card title="Software House">
            <p>
              As a software house I will take care of your problem from remote.
              You will have constant updates and be asked for constant feedback.
            </p>
            <p>
              I'll be putting the gun on your hand: the source code and every
              credential needed to access the service I'm building for you will
              be yours from day 1. This way you can get rid of me as soon as you
              like.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="IT Consultant">
            <p>
              As an IT consultant I'll be working phisically alongside with your
              team. This is the best solution if you want to monitor my work
              closely or simply prefer to keep the know-how in-house.
            </p>
            <p>
              There's a limit to this: I'm less likely to accept projects that
              last months, or will ask for a higher fee. It prevents me to do
              anything else. But experience taught me that you never need me for
              more than one or two months.
            </p>
            <p className="text-right">
              <Link to="/who/consultant">see what people say›</Link>
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Tech Lead">
            <p>
              As a tech lead of your team, or temporary CTO of your business, I
              will define the architecture, the technology stack, and the best
              practices to follow on your project. Then I will guide your team
              through pair programming and make them grow until they will be
              able to go on their own.
            </p>
            <p>
              After this initial phase we can have periodic sessions of coaching
              if you feel the need, in order to keep the project on the right
              track.
            </p>
            <p className="text-right">
              <Link to="/who/tech-lead">see what people say›</Link>
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Mentor/Coach">
            <p>
              As a mentor I will keep focus and motivation in your team. I will
              be the authoritative figure that rules in the disputes and gives
              the right hints for your team to follow the right path.
            </p>
            <p>
              Remember that developing people is as important, or even more,
              than developing software. Do not underestimate the utility of a
              good coach.
            </p>
            <p className="text-right">
              <Link to="/who/mentor">see what people say›</Link>
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Teacher">
            <p>
              As a teacher I will share my knowledge on the technology you
              require through a step-by-step practical exercise on a real-life
              application, backed by deep theoretical concepts about software
              engineering.
            </p>
            <p>
              Your team will be able to understand what to do, how to do it and
              why it should be done like that.
            </p>
            <p className="text-right">
              <Link to="/who/teacher">see what people say›</Link>
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Project Manager">
            <p>
              As a project manager I will keep track of the project's progress,
              enforce an{' '}
              <ExtLink to="https://en.wikipedia.org/wiki/Agile_software_development">
                Agile
              </ExtLink>{' '}
              process, and make sure that every stakeholder is happy.
            </p>
            <p>
              I will keep the pace fast but without haste, ease communication
              among the team, give constant feedback to the client. It's not
              just about updating Gantt diagrams, you know?
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
