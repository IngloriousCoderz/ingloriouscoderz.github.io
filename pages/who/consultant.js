import Layout from '~/layouts/default'

import Card from '~/components/card'
import ExtLink from '~/components/ext-link'

export default () => (
  <Layout path="who/consultant" title="Consultant" description="">
    <Card>
      <blockquote>
        <p>
          Anyway you are as expensive as platinum but you are worth platinum.
          Truly working with you is an extraordinary experience. And I can
          guarantee you that I have worked with people who are damn good.
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/savino-carlone-306b0897/">
              Savino Carlone
            </ExtLink>
            , Senior Web Developer (private conversation)
          </cite>
        </footer>
      </blockquote>
    </Card>

    <Card>
      <blockquote>
        <p>
          Antony is a very clever guy. He has a solid basis and a good problem
          solving attitude. Always seroius and professional at work. It's been a
          pleasure working with him.
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/danieledifederico/">
              Daniele Di Federico
            </ExtLink>
            , Lead Java Developer Contractor @ William Hill
          </cite>
        </footer>
      </blockquote>
    </Card>

    <Card>
      <blockquote>
        <p>
          Antony is a great software engineer! He has a deep knowledge of Object
          Oriented programming and the Java language. His skills also include
          graphic and multimedia libraries both high level and low level
          (OpenGL).
        </p>
        <p>
          It's fun to work with him, he's always pushing the project to a higher
          level!
        </p>
        <footer>
          &mdash;{' '}
          <cite>
            <ExtLink to="https://www.linkedin.com/in/leonardo-landini-5230512/">
              Leonardo Landini
            </ExtLink>
            , Freelance Software Architect
          </cite>
        </footer>
      </blockquote>
    </Card>
  </Layout>
)
