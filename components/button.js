import Link from 'next/link'
import { withI18n } from 'react-i18next'

export default withI18n()(({ id, href, title, target, rel, t }) => (
  <Link href={href || `/${id}`} prefetch>
    <a target={target} rel={rel}>
      {t(title)}
      <style jsx>{`
        a {
          flex: 1;
          background-color: rgba(40, 44, 52, 0.5);
          margin: 0.25rem;
          border: 1px solid #429aef;
          padding: 0.25rem;
          text-transform: uppercase;
        }

        a:hover {
          text-decoration: none;
        }
      `}</style>
    </a>
  </Link>
))
