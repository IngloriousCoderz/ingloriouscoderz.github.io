export default ({ title, image, children }) => (
  <section className="card card-1">
    <h2>{title}</h2>

    <div className="row">
      <div className="col-md-4">
        <div className="image-wrapper">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="col-md-8">{children}</div>
    </div>

    <style jsx>{`
      .image-wrapper {
        height: 100%;
        max-height: 240px;
        overflow: hidden;
      }

      .image-wrapper > img {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    `}</style>
  </section>
)
