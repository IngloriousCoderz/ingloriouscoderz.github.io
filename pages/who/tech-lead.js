import Layout from '~/layouts/default'

import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout>
    <Card>
      <blockquote>
        <p>
          In telling my experience as a colleague of Antony I think it is not
          necessary to list his skills and technical knowledge: this has already
          been done by others and is evident from his brilliant results. I will
          talk about the human factor that distinguishes him from all the people
          that I met in my career.
        </p>
        <p>
          First of all I would like to emphasize that in every work, from the
          simple cleaning of style sheets to a more complex architectural study
          of a software, he puts a great enthusiasm, which then succeeds in
          instilling into his colleagues, maybe turning a mediocre day into a an
          awesome one. This is an immense value for a company, because if you
          are lucky enough to work with him, not only will you have a brilliant
          and super-prepared developer, but you will have one that will do an
          excellent job and get others to do it better.
        </p>
        <p>
          He is the leader that everyone wants to have, because as mentioned
          before Antony is always ready to motivate his colleagues and in
          addition to this he will be able to better organize the work of the
          team, subdividing into tasks based on the ability and level of people
          he will deal with.
        </p>
        <p>
          Working with him I often found myself facing non-trivial problems with
          technologies never seen before that I could face brilliantly and
          smoothly, because one of his characteristics is to always help the
          elements of his group by pausing whatever he's doing and giving them
          his time.
        </p>
        <p>
          He is a very creative mind and like all minds of that kind it is
          important to continually provide him with a strong stimulus and great
          challenges. Do it without being afraid of overloading him, also
          because I have never seen him tired, while I sometimes see him bored!
        </p>
        <p>
          In summary, Antony is an extremely knowledgeable software engineer
          with excellent leadership skills, able to spur the elements of his
          team and teach them everything they need and more.
        </p>
        <p>If your software is hard to take off, he is the pilot for you!</p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/theprogrammerinthepauta/">
              Giorgio Elia
            </ExtLink>
            , Software Engineer
          </cite>
        </footer>
      </blockquote>
    </Card>

    <Card>
      <blockquote>
        <p>
          Antony was my tech lead during the working period at Seat PG. The
          experience in his group was the most formative and rewarding, his
          technical ability is surpassed only by the incessant desire to involve
          and teach, a true example of technical leader. He was able to
          introduce me to a world that was still partially obscure to me, making
          me a passionate. Even today his method, the momentum towards
          experimentation, but with absolute precision in following best
          practices and clean code, is the basis of all my work and my teaching
          towards my collaborators.
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/davidedispenza/">
              Davide Dispenza
            </ExtLink>
            , Senior Front End Developer @ Irion
          </cite>
        </footer>
      </blockquote>
    </Card>

    <Card>
      <blockquote>
        <p>
          Antony is a very competent person in his job and with excellent
          interpersonal and resource management skills. Collaborating with him
          in the Mobile Front End group in SeatPG is a continuous challenge in
          pursuit of innovation and a performing code, with an eye for an Agile
          job.
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/ferrerovalerio/">
              Valerio Ferrero
            </ExtLink>
            , Senior Software Developer focused on wearable solutions for field
            operations
          </cite>
        </footer>
      </blockquote>
    </Card>
  </Layout>
)
