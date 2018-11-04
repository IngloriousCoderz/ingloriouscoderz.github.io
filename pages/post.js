import withPost, { Content } from 'nextein/post'

import Layout from '~/layouts/default'
import ExtLink from '~/components/ext-link'
import Pre from '~/components/pre'

export default withPost(({ post }) => {
  return (
    <Layout>
      <article>
        <h1>{post.data.title}</h1>
        <Content
          {...post}
          renderers={{
            a: ExtLink,
            pre: Pre,
          }}
        />
      </article>
    </Layout>
  )
})
