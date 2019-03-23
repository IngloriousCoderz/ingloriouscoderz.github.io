import { PureComponent } from 'react'

import Icy from './icy'

const MAX_HEAD_TILT_X = 400
const MAX_HEAD_TILT_Y = 400

class LogoContainer extends PureComponent {
  state = { x: 0, y: 0 }

  logo = React.createRef()

  onMove = event => {
    const { preventScroll } = this.props
    const { target, pageX, pageY } =
      this.moveEvent === 'touchmove' ? event.touches[0] : event

    if (preventScroll && closestAncestor(target, 'logo')) {
      event.preventDefault()
    }

    const x = saturate(pageX - this.center.x, MAX_HEAD_TILT_X)
    const y = saturate(pageY - this.center.y, MAX_HEAD_TILT_Y)

    this.setState({ x, y })
  }

  componentDidMount() {
    const { preventScroll } = this.props

    const {
      left,
      top,
      width,
      height,
    } = this.logo.current.getBoundingClientRect()

    this.center = {
      x: window.pageXOffset + left + width / 2,
      y: window.pageYOffset + top + height / 2,
    }

    this.moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove'
    document.addEventListener(this.moveEvent, this.onMove, {
      passive: !preventScroll,
    })
  }

  componentWillUnmount() {
    document.removeEventListener(this.moveEvent, this.onMove)
  }

  render() {
    const { size, faces } = this.props

    return <Icy size={size} faces={faces} {...this.state} ref={this.logo} />
  }
}

LogoContainer.defaultProps = {
  size: 64,
  faces: [
    { image: 'I', reverse: false, eye: true },
    { image: 'C', reverse: false, eye: false },
  ],
  preventScroll: false,
}

export default LogoContainer

function isTouchDevice() {
  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true
  }

  // include the 'heartz' as a way to have a non matching mediaQuery to help terminate the join
  // https://git.io/vznFH
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return window.matchMedia(query).matches
}

function saturate(num, limit) {
  if (num < -limit) return -limit
  if (num > limit) return limit
  return num
}

function closestAncestor(el, className) {
  const limit = 4
  let i = 0
  let closest = el
  while (closest && i < limit) {
    if (
      closest.className == null ||
      typeof closest.className.split !== 'function'
    ) {
      return null
    }

    const classes = closest.className.split(' ')
    if (classes.includes(className)) {
      return closest
    }

    closest = closest.parentNode
    i++
  }
}
