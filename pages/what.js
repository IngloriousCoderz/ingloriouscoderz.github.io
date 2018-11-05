import Layout from '~/layouts/default'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout>
    <article className="card card-1">
      <h1>What</h1>

      <p>
        There's no better explanation of what we do than some real use case
        scenarios.
      </p>

      <h2>Fattutto</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/fattutto.png')}
          alt="Fattutto"
        />
        <div>
          <p>
            <ExtLink to="https://www.sistemict.it/">Sistemi ICT</ExtLink> wanted
            to create the best invoice management system. They wanted to start
            with the best architecture, with the best technologies, so they
            hired the best people.
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
            <ExtLink to="https://reactjs.org/">React</ExtLink>. Today the
            software is still in active development by the client alone, but it
            looks very promising.
          </p>
        </div>
      </section>

      <h2>Appointment Selector</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/appointment-selector.png')}
          alt="Appointment Selector"
        />
        <div>
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
            This is why they asked us to implement this responsive, performant,
            highly customizable, multi-touch{' '}
            <ExtLink to="https://reactjs.org/">React</ExtLink> component. It's
            very difficult to build simple things, so they chose to leave the
            task to us. After 9 days of constant feedback the component was
            delivered fully tested and bug-free, along with a{' '}
            <ExtLink to="https://storybook.js.org/">Storybook</ExtLink>{' '}
            playground.
          </p>
        </div>
      </section>

      <h2>PrivateGriffe</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/privategriffe.png')}
          alt="PrivateGriffe"
        />
        <div>
          <p>
            This is actually a failure case. But, as you may know, failures are
            as important, if not more, than success cases.
          </p>
          <p>
            <ExtLink to="https://it.privategriffe.com/">PrivateGriffe</ExtLink>{' '}
            was suffering from performance issues on their new{' '}
            <ExtLink to="https://reactjs.org/">React</ExtLink> front end and
            also for a bloated <ExtLink to="https://spring.io/">Spring</ExtLink>{' '}
            back end. We solved the most crucial performance issues and gathered
            a task force that re-created from scratch the back end server with{' '}
            <ExtLink to="https://loopback.io/">Loopback3</ExtLink> and the
            backoffice panel with{' '}
            <ExtLink to="https://coreui.io/react/">Core UI</ExtLink> for{' '}
            <ExtLink to="https://reactjs.org/">React</ExtLink>.
          </p>
          <p>
            Unfortunately the team performed slower than planned and the client
            argued with the supplier responsible for the front end, so
            development stopped and employees quit the company.
          </p>
        </div>
      </section>

      <h2>Lanieri BO Platform</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/bo-platform.png')}
          alt="Lanieri BO Platform"
        />
        <div>
          <p>
            <ExtLink to="https://protocube.it/">Protocube</ExtLink> wanted to
            hire us for a project that had to last six months. We told that they
            needed us for a lot less. They decided to go with two weeks for a
            start. After one week the project was ready for production.
          </p>
          <p>
            Lanieri Backoffice Platform is a{' '}
            <ExtLink to="https://vuejs.org/">Vue.js</ExtLink> web application
            backed by an <ExtLink to="https://expressjs.com/">Express</ExtLink>/
            <ExtLink to="https://www.mongodb.com/">MongoDB</ExtLink> server with
            authentication, file upload, and communication both REST and
            realtime. The project was then passed to the client's devs who
            easily continued working on it.
          </p>
          <p>
            The client is so satisfied with the outcome that we are being asked
            to build a more generic framework based on the features of this
            project and others.
          </p>
        </div>
      </section>

      <h2>GiadaJoeyCazzola.com</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/giadajoeycazzola.png')}
          alt="GiadaJoeyCazzola.com"
        />
        <div>
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
        </div>
      </section>

      <h2>Tazebao</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/tazebao.png')}
          alt="Tazebao"
        />
        <div>
          <p>
            To create the best school management system,{' '}
            <ExtLink to="http://www.cnosfap.net/">CNOS-FAP</ExtLink> needed
            someone who could solve the most complex algorithms, guide the
            architecture, and give best practices on code quality.
          </p>
          <p>
            The result is an ecosystem of different pieces of software, such as
            a desktop webapp in{' '}
            <ExtLink to="https://vuejs.org/">Vue.js</ExtLink>, a mobile
            electronic register in{' '}
            <ExtLink to="https://framework7.io/">Framework7</ExtLink>, a{' '}
            <ExtLink to="https://loopback.io/">Loopback3</ExtLink> server, and a{' '}
            <ExtLink to="https://dialogflow.com/">Dialogflow</ExtLink> bot.
          </p>
        </div>
      </section>

      <h2>Public Speaking</h2>

      <section>
        <img
          src={require('~/static/images/screenshots/apia.jpg')}
          alt="Public Speaking"
        />
        <div>
          <p>
            Inglorious Coderz are damn good at developing software but also at
            communicating software. That's why 50% of our activity consists in
            teaching, training, mentoring, coaching, and public speaking in
            general.
          </p>
          <p>
            Clients such as{' '}
            <ExtLink to="http://codemotiontraining.com/">Codemotion</ExtLink>,{' '}
            <ExtLink to="https://www.inacademy.eu/">
              European Innovation Academy
            </ExtLink>
            , <ExtLink to="https://www.vulog.com/">Vulog</ExtLink>, and{' '}
            <ExtLink to="http://www.forma-re-te.it/">forma-re-te</ExtLink> rely
            on us to provide the best training experience.
          </p>
          <p>
            Every lesson is a show: students manage to grasp the most difficult
            concepts explained in a super-easy and fun way. During our courses
            we build a complete project step-by-step from the ground up, and
            every step is backed by strong theoretical concepts.
          </p>
        </div>
      </section>
    </article>

    <style jsx>{`
      section {
        display: flex;
        align-items: flex-start;
      }

      section > img {
        width: 33%;
        margin-right: 1rem;
      }

      @media (max-width: 640px) {
        section {
          flex-direction: column;
        }
        section > img {
          width: 100%;
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    `}</style>
  </Layout>
)
