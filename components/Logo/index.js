import { Component } from 'react'

import I from './I.svg'
import eye from './eye.svg'
import C from './C.svg'

const MAX_HEAD_TILT_X = 400
const MAX_HEAD_TILT_Y = 400

class Logo extends Component {
  state = {
    transform: `scaleY(1.2) translateZ(${-this.props.size}px) rotateX(-40deg)
  rotateY(-45deg)`,
  }

  onMouseMove = event => {
    const { clientX, clientY } = event
    const { size } = this.props

    const vector = {
      x: saturate(clientX - this.center.x, MAX_HEAD_TILT_X),
      y: saturate(clientY - this.center.y, MAX_HEAD_TILT_Y),
    }

    // const polar = {
    //   r: Math.sqrt(vector.x * vector.x + vector.y * vector.y),
    //   a: Math.atan(vector.y / vector.x),
    // }

    this.setState({
      transform: `scaleY(1.2) translateZ(${-size}px) rotateX(calc(-40deg - 0.001 * ${
        vector.y
      }rad)) rotateY(calc(-45deg + 0.001 * ${vector.x}rad))`,
    })
  }

  componentDidMount() {
    const { x, width, y, height } = this.logo.getBoundingClientRect()
    this.center = {
      x: x + width / 2,
      y: y + height / 2,
    }

    document.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  render() {
    const { size } = this.props
    const { transform } = this.state

    return (
      <div className="logo" ref={el => (this.logo = el)}>
        <div className="cube">
          <div className="cube__face cube__face--front">
            <img src={I} />
            <img src={eye} />
          </div>
          <div className="cube__face cube__face--right">
            <img src={C} />
          </div>
        </div>

        <style jsx>{`
          .logo {
            width: ${size}px;
            perspective: ${size}px;
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
        `}</style>
      </div>
    )
  }
}

export default Logo

function saturate(num, limit) {
  if (num < -limit) return -limit
  if (num > limit) return limit
  return num
}
