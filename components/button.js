import Link from 'next/link'
import { withI18n } from 'react-i18next'

const Button = ({ id, href, target, rel, title, t }) => (
  <a href={href || `/${id}`} target={target} rel={rel}>
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
)

export default withI18n()(props => {
  const { id, href, target } = props
  return target ? (
    Button(props)
  ) : (
    <Link prefetch href={href || `/${id}`}>
      {Button(props)}
    </Link>
  )
})
