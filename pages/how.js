import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'

export default () => (
  <Layout path="how" title="How" description="The way we work, the way we are.">
    <Trans>
      <article className="card card-1">
        <h1>How</h1>

        <blockquote>
          <p>
            He who works with his hands is a laborer. He who works with his
            hands and his head is a craftsman. He who works with his hands and
            his head and his heart is an artist.
          </p>
          <footer>
            &mdash; <cite>Saint Francis of Assisi</cite>
          </footer>
        </blockquote>

        <p>Much more important than what we do is how we do it.</p>

        <p>
          An Inglorious Coder to be defined as such must conform to a series of
          parameters. Fortunately, these criteria are quite relatable to most
          people, but those who want to be considered an IC have to demonstrate
          that they not only agree with them, but apply them in everyday life.
        </p>

        <p>
          If you agree with all these points, apply them daily, or you're just
          curious on how we work then feel free to{' '}
          <a href="mailto:antony.mistretta@gmail.com">contact us</a>.
        </p>
      </article>

      <Row>
        <Column>
          <Card title="Lone Wolf">
            An IC is autonomous, works without depending on anyone and does not
            wait for orders or instructions. He is a reliable person: when left
            alone with a problem, he always returns a solution.
          </Card>
        </Column>

        <Column>
          <Card title="Pack Animal">
            The skill of an IC is not counterbalanced by his sociopathy. An
            Inglorious Coder is communicative: he knows how to speak English as
            well as machine language, he knows how to assert his opinions, he
            can transmit knowledge.
          </Card>
        </Column>

        <Column>
          <Card title="Aggressive">
            In a fast-paced market such as IT, one must always anticipate the
            demand for some moves. An IC is far-sighted, and plans the current
            solution not only to contain but to attack the future.
          </Card>
        </Column>

        <Column>
          <Card title="Crazy Dog">
            Dear old Steve Jobs quoted it many times: if you are not hungry and
            foolish you won't make a difference. An IC is passionate about his
            work, he makes it an art and puts all his creativity in it.
          </Card>
        </Column>

        <Column>
          <Card title="Ambitious">
            We leave the modesty to the mediocre. An Inglorious Coder knows his
            strengths and does not hide them, rather he uses them as an integral
            part of his arsenal.
          </Card>
        </Column>

        <Column>
          <Card title="Humble">
            An IC does not complain, he performs. He turns frustration into
            automation, lack of knowledge into self-training, constant change
            into abstractions. Along with strengths an Inglorious Coder knows
            his weaknesses and tries to overcome them, with all the support
            possible from more skilled people.
          </Card>
        </Column>

        <Column>
          <Card title="Lightning Fast">
            As a good hacker an Inglorious Coder learns and acts fast: he
            quickly finds the most relevant information and applies it to the
            context.
          </Card>
        </Column>

        <Column>
          <Card title="Cold">
            Fast but without haste, an Inglorious Coder does not feel
            performance anxiety and manages to make the right decisions at the
            right time.
          </Card>
        </Column>

        <Column>
          <Card title="Pirate">
            An IC is result-oriented, and goes straight towards the goal even at
            the cost of going against unnecessary rules, bureaucracy,
            documentation, meetings, planning. Everything that acts as a barrier
            to his freedom of expression is immediately bypassed.
          </Card>
        </Column>

        <Column>
          <Card title="Solid">
            Freedom must have a limit, and this limitation is legality and
            ethics. An Inglorious Coder does not look for easy money, he does
            not evade tax, he does not deceit anybody. He is absolutely
            transparent to anyone, law-abiding, and honest to the bone.
          </Card>
        </Column>

        <Column>
          <Card title="Sniper">
            The speed of execution must never be to the detriment of accuracy.
            An Inglorious Coder writes code that is clean, readable,
            standards-compliant, well tested, and easy to debug.
          </Card>
        </Column>

        <Column>
          <Card title="Ruthless">
            The impossible triangle "Fast, Good, Cheap" has a solution, and it
            is "Simplicity". An IC reduces any complex problem to a simple
            solution and then refactors it continuously to make it even simpler,
            because he knows that a simple code is of higher quality than
            complex code, is faster to implement and cheaper to maintain on the
            long run.
          </Card>
        </Column>

        <Column>
          <Card title="Extreme">
            An Inglorious Coder does not compromise. He does not submit to the
            most fashionable but less suitable technology, he does not perceive
            sums in black, he does not give up on quality and passion. Money is
            not the primary goal, it is a side effect of a well done job.
          </Card>
        </Column>

        <Column>
          <Card title="Liquid">
            Inflexible in some cases, but completely flexible on others, an IC
            knows that in any kind of selection those who adapt better will
            survive. That's why he is able to fully understand and take care of
            a problem as if it were his, he accepts insuperable limits and gets
            the most profit possible from the situation, he embraces change and
            uses it as a weapon in his favour.
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
