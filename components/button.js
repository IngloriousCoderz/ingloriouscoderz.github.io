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
        <style jsx>{`
          .button {
            flex: 1;
            background-color: rgba(40, 44, 52, 0.5);
            margin: 0.25rem;
            border: 1px solid #429aef;
            padding: 0.25rem 0.5rem;
            text-transform: uppercase;
            line-height: 1;
          }
        `}</style>
      </Component>
    )
  },
)
