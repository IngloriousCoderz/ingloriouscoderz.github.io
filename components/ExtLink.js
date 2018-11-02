const ExtLink = ({ to, children }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export default ExtLink
