import Link from 'next/link'
import { withI18n } from 'react-i18next'

const Button = ({ id, href, target, rel, onClick, title, children, t }) => (
  <a href={href || `/${id}`} target={target} rel={rel} onClick={onClick}>
    {t(title || children)}
    <style jsx>{`
      a {
        flex: 1;
        background-color: rgba(40, 44, 52, 0.5);
        margin: 0.25rem;
        border: 1px solid #429aef;
        padding: 0.25rem 0.5rem;
        text-transform: uppercase;
      }
    `}</style>
  </a>
)

export default withI18n()(props => {
  const { id, href, target, onClick } = props
  return target || onClick ? (
    Button(props)
  ) : (
    <Link prefetch href={href || `/${id}`}>
      {Button(props)}
    </Link>
  )
})
