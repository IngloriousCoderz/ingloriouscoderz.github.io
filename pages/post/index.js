import withPost, { Content } from 'nextein/post'

import i18n from '~/utils/i18n'
import Layout from '~/layouts/default'
import ExtLink from '~/components/ext-link'
import Pre from '~/components/pre'

export default withPost(({ post }) => (
  <Layout
    path={`blog/${post.data.name}`}
    title={post.data.title}
    description={post.data.description}>
    <article className="card card-1">
      <h1>{post.data.title}</h1>

      <time dateTime={post.data.date}>
        {new Date(post.data.date).toLocaleDateString(i18n.language)}
      </time>

      <Content {...post} renderers={{ a: ExtLink, pre: Pre }} />
    </article>

    <style jsx>{`
      article > time {
        display: block;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
        color: #9a9a9a;
      }
    `}</style>
  </Layout>
))
