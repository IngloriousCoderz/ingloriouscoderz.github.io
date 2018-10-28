import Link from 'next/link'

const Button = ({ id, href, title, target, rel }) => (
  <Link href={href || `/${id}`} prefetch>
    <a target={target} rel={rel}>
      {title}
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
)

export default Button
