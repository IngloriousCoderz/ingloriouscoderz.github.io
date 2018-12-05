import { PureComponent } from 'react'

const MAX_HEAD_TILT_X = 400
const MAX_HEAD_TILT_Y = 400

class Logo extends PureComponent {
  state = {
    transform: `scaleY(1.2) translateZ(${-this.props.size}px) rotateX(-40deg)
  rotateY(-45deg)`,
  }

  logo = React.createRef()

  onMove = event => {
    const { size } = this.props

    const { pageX, pageY } = event

    const x = saturate(pageX - this.center.x, MAX_HEAD_TILT_X)
    const y = saturate(pageY - this.center.y, MAX_HEAD_TILT_Y)

    // const polar = {
    //   r: Math.sqrt(vector.x * vector.x + vector.y * vector.y),
    //   a: Math.atan(vector.y / vector.x),
    // }

    this.setState({
      transform: `scaleY(1.2) translateZ(${-size}px) rotateX(calc(-40deg - 0.001 * ${y}rad)) rotateY(calc(-45deg + 0.001 * ${x}rad))`,
    })
  }

  componentDidMount() {
    const { x, width, y, height } = this.logo.current.getBoundingClientRect()
    this.center = {
      x: x + width / 2,
      y: y + height / 2,
    }

    document.addEventListener('mousemove', this.onMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMove)
  }

  render() {
    const { size, letters, reverse, eyes } = this.props
    const { transform } = this.state
    const [leftLetter, rightLetter] = letters
    const [reverseLeft, reverseRight] = reverse
    const [leftEye, rightEye] = eyes

    return (
      <div className="logo" ref={this.logo}>
        <div className="cube">
          <div className="cube__face cube__face--front">
            <img src={require(`./faces/${leftLetter}.svg`)} alt={leftLetter} />
            {leftEye && (
              <img className="eye" src={require('./eye.svg')} alt="left eye" />
            )}
          </div>
          <div className="cube__face cube__face--right">
            <img
              src={require(`./faces/${rightLetter}.svg`)}
              alt={rightLetter}
            />
            {rightEye && (
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
            transform: ${transform};
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

          .cube__face--front {
            transform: rotateY(0deg) translateZ(${size / 2}px) skew(12deg);
          }

          .cube__face--right {
            transform: rotateY(90deg) translateZ(${size / 2}px) skew(-12deg);
          }

          .cube__face--right > .eye {
            transform: rotateY(180deg);
          }

          .cube__face--front > img:first-of-type {
            ${reverseLeft ? 'transform: rotateY(180deg);' : ''}
          }

          .cube__face--right > img:first-of-type {
            ${reverseRight ? 'transform: rotateY(180deg);' : ''}
          }
        `}</style>
      </div>
    )
  }
}

Logo.defaultProps = {
  size: 64,
  letters: 'IC',
  reverse: [false, false],
  eyes: [true, false],
}

export default Logo

function saturate(num, limit) {
  if (num < -limit) return -limit
  if (num > limit) return limit
  return num
}
