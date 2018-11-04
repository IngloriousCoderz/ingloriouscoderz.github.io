// This component is not working, don't use it!
// 1. require with params doesn't recognize module
// 2. dynamic requires don't work

export default ({ src, alt }) => (
  <picture>
    <source srcSet={require(`${src}?webp`)} type="image/webp" />
    <source srcSet={require(src)} type="image/png" />
    <img src={require(src)} alt={alt} />
  </picture>
)
