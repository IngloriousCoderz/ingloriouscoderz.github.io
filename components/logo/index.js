import { PureComponent } from 'react'

import Logo from './logo'

const MAX_HEAD_TILT_X = 400
const MAX_HEAD_TILT_Y = 400

class LogoContainer extends PureComponent {
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
    const { size, faces } = this.props
    const { transform } = this.state

    return (
      <Logo size={size} faces={faces} transform={transform} ref={this.logo} />
    )
  }
}

LogoContainer.defaultProps = {
  size: 64,
  faces: [
    { image: 'I', reverse: false, eye: true },
    { image: 'C', reverse: false, eye: false },
  ],
}

export default LogoContainer

function saturate(num, limit) {
  if (num < -limit) return -limit
  if (num > limit) return limit
  return num
}
