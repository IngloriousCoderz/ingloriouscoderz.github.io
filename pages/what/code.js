import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="what/code" title="Code" description="">
    <Trans>
      <section className="card card-1">
        <h1>Code</h1>

        <p>
          Coding is a mean through which we express ourselves. It is an
          artisanal activity that mixes creativity and logic. That's why every
          project is treated like a creature we raise and nurture until it is
          able to go on its own.
        </p>
      </section>

      <Row>
        <Column max={3}>
          <Card
            title="Fattutto"
            image={require('~/static/images/what/code/fattutto.png')}>
            <p>
              <ExtLink to="https://www.sistemict.it/">Sistemi ICT</ExtLink>{' '}
              wanted to create the best invoice management system. They wanted
              to start with the best architecture, with the best technologies,
              so they hired the best people.
            </p>
            <p>
              Four developers, one of wich was an IC, met at the Inglorious
              Headquarters for a total of 29 days. Together in this short period
              of time they:
            </p>
            <ul>
              <li>defined the product (features, UX)</li>
              <li>defined the project (technology stack, planning)</li>
              <li>laid out an MVP</li>
            </ul>
            <p>
              Two devs created the back end in{' '}
              <ExtLink to="https://www.microsoft.com/net/download">
                .NET Core
              </ExtLink>
              , while the other two developed the front end in{' '}
              <ExtLink to="https://coreui.io/react/">Core UI</ExtLink> for{' '}
              <ExtLink to="https://reactjs.org/">React</ExtLink>. To date, the
              customer is continuing to develop independently, and the result
              looks very promising.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Appointment Selector"
            image={require('~/static/images/what/code/appointment-selector.png')}>
            <p>
              <ExtLink to="https://www.milkman.it/">Milkman</ExtLink> is the
              perfect solution for your home deliveries. The key concepts are:
            </p>
            <ul>
              <li>You get your package delivered at home whenever you want</li>
              <li>
                You book your appointment from mobile or desktop in a simple and
                pleasant way
              </li>
            </ul>
            <p>
              This is why they asked us to implement this responsive,
              performant, highly customizable, multi-touch{' '}
              <ExtLink to="https://reactjs.org/">React</ExtLink> component. It's
              very difficult to build simple things, so they chose to leave the
              task to us. After 9 days of constant feedback the component was
              delivered fully tested and bug-free, along with a{' '}
              <ExtLink to="https://storybook.js.org/">Storybook</ExtLink>{' '}
              playground.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Saving Private Griffe"
            image={require('~/static/images/what/code/privategriffe.png')}>
            <p>
              This is actually a failure case. But, as you may know, failures
              are as important, if not more, than success cases.
            </p>
            <p>
              The startup company{' '}
              <ExtLink to="https://it.privategriffe.com/">
                PrivateGriffe
              </ExtLink>{' '}
              was on the edge of default due to severe performance issues on
              their new <ExtLink to="https://reactjs.org/">React</ExtLink> front
              end and also for a heavily bloated{' '}
              <ExtLink to="https://spring.io/">Spring</ExtLink> back end. We
              solved the most crucial performance issues and gathered a task
              force that re-created from scratch the back end server with{' '}
              <ExtLink to="https://loopback.io/">Loopback 3</ExtLink> and the
              backoffice panel with{' '}
              <ExtLink to="https://coreui.io/react/">Core UI</ExtLink> for{' '}
              <ExtLink to="https://reactjs.org/">React</ExtLink>.
            </p>
            <p>
              Unfortunately lots of obstacles along the way prevented us to go
              further. Half of the employees quit the firm while the controlling
              company, <ExtLink to="https://www.axelero.it/">axélero</ExtLink>,
              cut salaries to avoid defaulting itself.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Lanieri BO Platform"
            image={require('~/static/images/what/code/bo-platform.png')}>
            <p>
              <ExtLink to="https://protocube.it/">Protocube</ExtLink> wanted to
              hire us for a project that had to last six months. We told that
              they needed us for a lot less. They decided to go with two weeks
              for a start. After one week the project was ready for production.
            </p>
            <p>
              Lanieri Backoffice Platform is a{' '}
              <ExtLink to="https://vuejs.org/">Vue.js</ExtLink> web application
              backed by an{' '}
              <ExtLink to="https://expressjs.com/">Express</ExtLink>/
              <ExtLink to="https://www.mongodb.com/">MongoDB</ExtLink> server
              with authentication, file upload, and communication both REST and
              realtime. The project was then passed to the client's devs who
              easily continued working on it.
            </p>
            {/* <p>
              The client is so satisfied with the outcome that we are being
              asked to build a more generic framework based on the features of
              this project and others.
            </p> */}
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="GiadaJoeyCazzola.com"
            image={require('~/static/images/what/code/giadajoeycazzola.png')}>
            <p>
              Inglorious Coderz do not always make websites. But when they do,
              they build them from scratch.
            </p>
            <p>
              <ExtLink to="https://www.giadajoeycazzola.com">
                GiadaJoeyCazzola.com
              </ExtLink>{' '}
              is a responsive and SEO-friendly progressive webapp generated with{' '}
              <ExtLink to="https://nuxtjs.org/">Nuxt</ExtLink>. Although it
              doesn't allow the user to publish their own content (which could
              also be considered a feature, because it ensures content
              correctness), the UX is completely custom and the performance
              achieved is far better than any CMS-generated website.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Tazebao"
            image={require('~/static/images/what/code/tazebao.png')}>
            <p>
              To create the best school management system,{' '}
              <ExtLink to="http://www.cnosfap.net/">CNOS-FAP</ExtLink> needed
              someone who could solve the most complex algorithms, guide the
              architecture, and give best practices on code quality.
            </p>
            <p>
              The result is an ecosystem of different pieces of software, such
              as a desktop webapp in{' '}
              <ExtLink to="https://vuejs.org/">Vue.js</ExtLink>, a mobile
              electronic register in{' '}
              <ExtLink to="https://framework7.io/">Framework7</ExtLink>, a{' '}
              <ExtLink to="https://loopback.io/">Loopback 3</ExtLink> server,
              and a <ExtLink to="https://dialogflow.com/">Dialogflow</ExtLink>{' '}
              bot.
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
