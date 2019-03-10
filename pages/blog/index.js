import Link from 'nextein/link'
import { withPostsFilterBy, inCategory, sortByDate } from 'nextein/posts'
import { Content } from 'nextein/post'
import { withI18n } from 'react-i18next'

import { compose } from '~/utils/compose'
import i18n from '~/utils/i18n'
import Layout from '~/layouts/default'
import ExtLink from '~/components/ext-link'
import Pre from '~/components/pre'

const enhance = compose(
  withPostsFilterBy(inCategory('blog')),
  withI18n(),
)
export default enhance(({ posts, t }) => (
  <Layout
    path="blog"
    title="Blog"
    description="A place where we share our knowledge.">
    <article className="card card-1">
      <h1>Blog</h1>
      <p>
        This is where the community shares some of their experiences with
        software and entrepreneurship in general. Italian only for now, sorry :)
      </p>
    </article>

    {posts.sort(sortByDate).map((post, index) => (
      <article key={`post-${index}`} className="card card-1">
        <h1>{post.data.title}</h1>
        <time dateTime={post.data.date}>
          {new Date(post.data.date).toLocaleDateString(i18n.language)}
        </time>
        <Content
          {...post}
          excerpt
          renderers={{
            a: ExtLink,
            pre: Pre,
          }}
        />
        <p className="text-right">
          <Link {...post}>
            <a>{t('read more›')}</a>
          </Link>
        </p>
      </article>
    ))}

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
