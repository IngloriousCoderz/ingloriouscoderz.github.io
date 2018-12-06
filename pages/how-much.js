import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Column from '~/components/column'
import Card from '~/components/card'

export default () => (
  <Layout path="how-much" title="How Much" description="">
    <Trans>
      <article className="card card-1">
        <h1>How Much</h1>

        <p>
          What an indelicate question. Well, of course our answer will be: it
          depends. There are lots of factors involved, including the client, the
          project, the working conditions, the country, and many more. We can't
          just throw a number and that's it.
        </p>

        <p>
          The price for an Inglorious service ranges from €0 to €2000 a day.
          Yes, even zero! But unless you can provide something valuable in
          exchange, or you are an endangered species, it will be higher than
          that.
        </p>

        <p>
          So, how much? Well, think about the highest fare you are able to pay.
          Now think about the highest fare you are <em>willing</em> to pay. Ok,
          now find the mean and then add some more. That's the price.
        </p>

        <p>
          It's not a joke, and it's actually quite reasonable if you think about
          it:
        </p>
      </article>

      <Row>
        <Column max={3}>
          <Card title="Craftsmanship">
            <p>
              As you may have understood already, the Inglorious way is all
              about crafting beautiful solutions for your problem.
            </p>
            <p>
              If you want a standard solution you can ask a standard consultant.
              If instead you dream big and want your project to rock, then you
              found the right guys for the job.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="One-Man Army">
            <p>
              When you hire an Inglorious Coder, you're actually hiring an
              entire team of professionals all in one. The project will be
              delivered in half of the time and hassle-free.
            </p>
            <p>
              So instead of hiring an architect for, say, 100 and a developer
              for 80, you just need to hire an IC for 150 and you're good to go.
              See how cheap it is?
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Self-Improvement">
            <p>
              A high fare allows us to work less. And when we work less we can
              spend the rest of our time in improving ourselves. We train to be
              better teachers, we practice to be better coders, we volunteer to
              be better humans.
            </p>
            <p>And this will mainly benefit you, the client.</p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Less Is More">
            <p>
              If you think you'll have to pay all that money for six months of
              work, don't be afraid: it won't be six months. Experience taught
              us that you will need us for much less time, at the end of which
              you will have a stable, durable and maintainable piece of
              software.
            </p>
            <p>
              On the other hand, you know how they say: you buy cheap, you buy
              twice. Too many clients bought cheap before turning to us.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="60% Off">
            <p>
              Since the Italian Revenue Service keeps more than half of a
              business' income, and since we will never accept off-books
              payment, fares must necessarily be kept pretty high.
            </p>
            <p>
              Some IT consultants take measures by accepting any job at any
              price, and then trying to sell a poor service for that price. We
              break this pattern by accepting only some jobs and deserving a
              high fare.
            </p>
          </Card>
        </Column>

        <Column max={3}>
          <Card title="Because We Can">
            <p>
              We don't do it for the money, we do it for the lulz. That's why
              the price will never be mandated by the client. It will be agreed
              upon both parts and it will be the right price &mdash; no more, no
              less.
            </p>
            <p>
              Also remember that you can choose to hire us for a limited time
              and opt-out whenever you want. We are here to help, not to put
              your business on your knees. We will provide maximum flexibility
              and understanding if needed.
            </p>
          </Card>
        </Column>
      </Row>
    </Trans>
  </Layout>
)
