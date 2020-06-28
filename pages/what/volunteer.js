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
    description="The world is not going to get better with just code."
  >
    <Trans>
      <article className="card card-1">
        <h1>Volunteer</h1>
        <p>
          The purpose of Inglorious Coderz is to build a better world. But
          let&apos;s face it, code by itself will not suffice. That&apos;s why
          we are also first in line when dealing with volunteering. Part of the
          money we earn is not just spent on charity, it allows us to take
          action directly.
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card
            title="Powercoders"
            image={require('~/static/images/what/volunteer/powercoders.jpg')}
          >
            <p>
              <ExtLink to="https://powercoders.org/">Powercoders</ExtLink> is a
              Swiss NGO aimed at giving a second chance to refugees all over the
              world by offering them a free 3-months course on web development
              and a paid internship as junior developers in affiliated
              companies.
            </p>
            <p>
              The year 2019 marked the beginning of the pilot program in Italy,
              sponsored by{' '}
              <ExtLink to="https://realefoundation.org/">
                Reale Foundation
              </ExtLink>{' '}
              and{' '}
              <ExtLink to="https://fondazioneaccenture.it/">
                Fondazione Italiana Accenture
              </ExtLink>{' '}
              and powered by{' '}
              <ExtLink to="https://www.lewagon.com/">Le Wagon</ExtLink>: twenty
              students coming from different countries of Africa and the Middle
              East gathered in{' '}
              <ExtLink to="https://www.toolboxoffice.it/en/">
                Toolbox Coworking
              </ExtLink>{' '}
              for an intensive bootcamp on web technologies, using laptops
              provided for free by{' '}
              <ExtLink to="https://www.lenovo.com/us/en/">Lenovo</ExtLink>.
            </p>
            <p>
              Inglorious Coderz was involved for the role of Teaching Lead,
              which means giving classes, assigning tasks, and managing a team
              of volunteer IT trainers and technical speakers, most of them
              freelancers or coming from big companies such as{' '}
              <ExtLink to="https://www.ibm.com/">IBM</ExtLink> and{' '}
              <ExtLink to="https://www.accenture.com/">Accenture</ExtLink>.
            </p>
            <p>
              Even the{' '}
              <ExtLink to="https://en.wikipedia.org/wiki/Coronavirus_disease_2019">
                COVID-19
              </ExtLink>{' '}
              spread could not stop the bootcamp, which was moved online during
              the last weeks. Overall the program was an unparalleled success.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Les Jeunes Leaders Du Burundi"
            image={require('~/static/images/what/volunteer/jeunes_leaders_du_burundi.jpg')}
          >
            <p>
              <ExtLink to="https://www.linkedin.com/in/kaburugutu-fabrice-b28399157/">
                Fabrice Kaburugutu
              </ExtLink>
              , a young Engineering student from Bujumbura, had a dream: to
              promote the sustainable economic, social and cultural development
              of Burundi in particular and the region in general by stimulating
              youth employment and career opportunities through sustainable
              development goals.
            </p>
            <p>
              So he decided to create a non-profit organization, run entirely by
              himself between his exams, and to give free conferences on the
              topic. The first one was held in March 30th 2019.
            </p>
            <p>
              Inglorious Coderz remotely assisted the development of the{' '}
              <ExtLink to="https://leadersburundi.wordpress.com/">
                Association&apos;s website
              </ExtLink>{' '}
              and its{' '}
              <ExtLink to="https://www.facebook.com/Les-jeunes-leaders-du-Burundi-2043300449039820/">
                Facebook page
              </ExtLink>
              , and involved both{' '}
              <ExtLink to="https://www.linkedin.com/in/iboyadzhieva/">
                Inna Boyadzhieva
              </ExtLink>{' '}
              for advice on crowdfunding and{' '}
              <ExtLink to="https://www.linkedin.com/in/mariamatloub/">
                Maria Matloub
              </ExtLink>{' '}
              for the conference&apos;s poster design.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card
            title="Lampedusa Turtle Group"
            image={require('~/static/images/what/volunteer/lampedusa_bath.jpg')}
          >
            <p>
              Sea turtles are not only beautiful animals, but they are essential
              for the marine ecosystem because they are greedy for jellyfish,
              which threatens our oceans due to their exponentially increasing
              number.
            </p>
            <p>
              Although a sea turtle&apos;s lifespan could reach 150 years or
              more, many of them die way earlier due to human interference:
              fishing nets, hooks, trash, global warming, ... We must start to
              behave responsibly towards our environment, and we have to do it
              quick.
            </p>
            <p>
              <ExtLink to="http://www.lampedusaturtlerescue.org/">
                Lampedusa Turtle Group
              </ExtLink>{' '}
              is a research center, a hospital, and a museum related to sea
              turtles guided by an amazing human being, Dr.{' '}
              <ExtLink to="https://www.linkedin.com/in/daniela-freggi-2bb324a7/">
                Daniela Freggi
              </ExtLink>
              . We spent two weeks, together with other volunteers from all over
              the world, performing various activities &mdash; manual work such
              as cleaning up the center, the turtles, and their pools every two
              mornings, but also assisting veterinarian surgeons and guiding
              visitors through the museum and raising awareness.
            </p>
          </Card>
        </Column>

        {/* <Column max={3}>
          <Card
            title="More to come..."
            image={require('~/static/images/what/volunteer/lampedusa_dynamic_duo.jpg')}
          >
            <p>
              We are just started yet. We hope to fill this page with many more
              volunteering activities as soon as possible.
            </p>
          </Card>
        </Column> */}
      </Row>
    </Trans>
  </Layout>
)
