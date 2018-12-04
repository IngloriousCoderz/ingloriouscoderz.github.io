export default ({ title, image, children }) => (
  <section className="card card-1">
    {image && (
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
    )}

    {title && <h2>{title}</h2>}

    {children}

    <style jsx>{`
      .image-wrapper {
        height: 100%;
        max-height: 240px;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin: -1rem -1rem 0;
      }
    `}</style>
  </section>
)
