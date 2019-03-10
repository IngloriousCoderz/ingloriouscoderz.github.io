import { Component } from 'react'

import Layout from '~/layouts/default'

const ONE_SECOND = 1000

export default class extends Component {
  state = { date: new Date() }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ date: new Date() }),
      ONE_SECOND,
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <Layout
        path="why"
        title="Why"
        description="Yet another software house. Or is it?">
        <article className="card card-1">
          <h1>Why</h1>

          <p>
            It is UNIX time{' '}
            <code>{Math.round(this.state.date.getTime() / 1000)}</code>, the Age
            of Information. Everything is connected, everything sends and
            receives data.
          </p>
          <p>
            Humans are overwhelmed by superficial information and are losing any
            deep thought, any interest in knowledge. Ensnared by consumerism,
            they are becoming mere purchasers.
          </p>
          <p>
            On the other hand machines are evolving rapidly, gaining a role in
            society that's more and more relevant. They are replacing us in
            every aspect of life, sometimes performing much better than humans
            even on tasks that we thought required human interaction.
          </p>
          <p>
            No one knows if machines will take us over completely, when will it
            happen, and what consequences will it have. Maybe we will witness
            the realization of a utopia in which humans will have nothing to do
            but enjoy life. Meanwhile, however, people are losing their jobs and
            starting to feel useless.
          </p>
          <p>
            There is only one thing that we humans can still do better than
            machines: being human. We feel compassion, we care for others, we
            love what we do. In this industrial, globalized, low-cost society we
            still appreciate the value of good craftsmanship.
          </p>
          <p>
            This is Inglorious Coderz: we strongly believe in good software made
            by good people for good clients. We find a solution because we care
            for your problem. We guide you to the solution because we care for
            you. We build the best solution because we care for us.
          </p>
        </article>
      </Layout>
    )
  }
}
