import Link from 'next/link'

export default ({
  className,
  to,
  href,
  target,
  rel,
  onClick,
  children,
  'aria-label': ariaLabel,
  ...rest
}) => (
  <Link href={to || href} {...rest} passHref>
    <a
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  </Link>
)
