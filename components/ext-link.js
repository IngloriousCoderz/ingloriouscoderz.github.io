export default ({ to, href, children }) => (
  <a href={to || href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)
