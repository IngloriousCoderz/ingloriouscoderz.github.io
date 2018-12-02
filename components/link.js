import Link from 'next/link'

export default ({
  className,
  to,
  href,
  target,
  rel,
  onClick,
  children,
  ...rest
}) => (
  <Link href={to || href} {...rest} passHref>
    <a className={className} target={target} rel={rel} onClick={onClick}>
      {children}
    </a>
  </Link>
)
