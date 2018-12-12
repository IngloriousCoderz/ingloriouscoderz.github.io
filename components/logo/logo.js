import { compose } from '~/utils/compose'

const enhance = compose(
  React.memo,
  React.forwardRef,
)

const MINUS_FORTY_DEGREES = degreesToRadians(-40)
const MINUS_FORTY_FIVE_DEGREES = degreesToRadians(-45)

export default enhance(({ size, faces, x, y }, ref) => {
  const [left, right] = faces

  return (
    <div className="logo" ref={ref}>
      <div className="cube">
        <div className="cube__face cube__face--left">
          <img src={require(`./faces/${left.image}.svg`)} alt={left.image} />
          {left.eye && (
            <img className="eye" src={require('./eye.svg')} alt="left eye" />
          )}
        </div>
        <div className="cube__face cube__face--right">
          <img src={require(`./faces/${right.image}.svg`)} alt={right.image} />
          {right.eye && (
            <img className="eye" src={require('./eye.svg')} alt="right eye" />
          )}
        </div>
      </div>

      <style jsx>{`
        .logo {
          width: ${size}px;
          perspective: ${size}px;
          margin: 0 auto;
        }

        .cube {
          height: ${size}px;
          transform-style: preserve-3d;
          transform: scaleY(1.2) translateZ(${-size}px)
            rotateX(${MINUS_FORTY_DEGREES - 0.001 * y}rad)
            rotateY(${MINUS_FORTY_FIVE_DEGREES + 0.001 * x}rad);
          transition: ease-out 0.2s;
        }

        .cube__face {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: bottom center;
        }

        .cube__face > img {
          position: absolute;
        }

        .cube__face--left {
          transform: rotateY(0deg) translateZ(${size / 2}px) skew(12deg);
        }

        .cube__face--right {
          transform: rotateY(90deg) translateZ(${size / 2}px) skew(-12deg);
        }

        .cube__face--right > .eye {
          transform: rotateY(180deg);
        }

        .cube__face--left > img:first-of-type {
          ${left.reverse ? 'transform: rotateY(180deg);' : ''}
        }

        .cube__face--right > img:first-of-type {
          ${right.reverse ? 'transform: rotateY(180deg);' : ''}
        }
      `}</style>
    </div>
  )
})

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180
}
