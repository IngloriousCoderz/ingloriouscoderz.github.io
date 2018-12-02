import Link from '~/components/link'
import { withI18n } from 'react-i18next'

export default withI18n()(
  ({ t, id, to, href, target, rel, onClick, title, children }) => {
    const Component = target || onClick ? 'a' : Link
    return (
      <Component
        href={to || href || `/${id}`}
        target={target}
        rel={rel}
        onClick={onClick}
        className="button">
        {children && typeof children !== 'string'
          ? children
          : t(title || children)}
      </Component>
    )
  },
)
