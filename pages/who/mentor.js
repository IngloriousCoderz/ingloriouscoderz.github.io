import Layout from '~/layouts/default'

import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout>
    <Card>
      <blockquote>
        <p>
          Antony is a great human being to start with. He is an apt person to be
          titled as a mentor for he has the perfect sense of understanding of
          both the person as well as the idea that is being communicated to him
          and this understanding is evident in his evaluation of the idea's
          which is absolutely exceptional. In particular to my case, he was also
          kind enough to promote my idea to the concerned CEO who was present
          there at that time so that I could get more exposure for my idea. He
          is absolutely a great person to work with and a great mentor in whom
          one could rely for so as to develop a sound solution with a sense of
          innovation and pragmatism.
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/tittoephraimmathew/">
              Titto Ephraim Matthew
            </ExtLink>
            , MSc Aerospace / Aviation / Entrepreneur / Innovator / Strategy /
            Business Developer / Leadership
          </cite>
        </footer>
      </blockquote>
    </Card>

    <Card>
      <blockquote>
        <p>
          Brilliant coach, he exposes complex concepts with simplicity and
          effectiveness. Putting in passion in the subject he transmits
          seriousness and enthusiasm, available for confrontation and responsive
          to requests for further information.
        </p>
        <p>Surely for a company it is an added value out of the ordinary.</p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/alessio-geraci-0a989833/">
              Alessio Geraci
            </ExtLink>
            , Java Software Developer @ ALTEN Italy
          </cite>
        </footer>
      </blockquote>
    </Card>
  </Layout>
)
