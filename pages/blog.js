import Link from 'next/link'
import { withPostsFilterBy, inCategory, sortByDate } from 'nextein/posts'
import { Content } from 'nextein/post'
import { withI18n } from 'react-i18next'

import { compose } from '~/utils/compose'
import i18n from '~/utils/i18n'
import Layout from '~/layouts/default'

const enhance = compose(
  withPostsFilterBy(inCategory('blog')),
  withI18n(),
)
export default enhance(({ posts, t }) => (
  <Layout hasBackground={false}>
    {posts.sort(sortByDate).map((post, index) => (
      <article key={`post-${index}`} className="card card-1">
        <h2>{post.data.title}</h2>
        <time dateTime={post.data.date}>
          {new Date(post.data.date).toLocaleDateString(i18n.language)}
        </time>
        <Content {...post} excerpt />
        <p className="read-more">
          <Link href={post.data.url}>
            <a>{t('read more...')}</a>
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

      article > .read-more {
        text-align: right;
      }
    `}</style>
  </Layout>
))
