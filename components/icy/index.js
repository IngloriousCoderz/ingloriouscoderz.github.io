import { memo, useRef, useState, useEffect } from 'react'

import Icy from './icy'

const MAX_HEAD_TILT_X = 400
const MAX_HEAD_TILT_Y = 400

export default memo(
  ({
    size = 64,
    faces = [
      { image: 'I', reverse: false, eye: true },
      { image: 'C', reverse: false, eye: false },
    ],
    preventScroll = false,
  }) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })

    const logo = useRef()

    let center = null
    let moveEvent = null

    const onMove = (event) => {
      const { target, pageX, pageY } =
        moveEvent === 'touchmove' ? event.touches[0] : event

      if (preventScroll && closestAncestor(target, 'logo')) {
        event.preventDefault()
      }

      setCoords({
        x: saturate(pageX - center.x, MAX_HEAD_TILT_X),
        y: saturate(pageY - center.y, MAX_HEAD_TILT_Y),
      })
    }

    useEffect(() => {
      const { left, top, width, height } = logo.current.getBoundingClientRect()

      center = {
        x: window.pageXOffset + left + width / 2,
        y: window.pageYOffset + top + height / 2,
      }

      moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove'
      document.addEventListener(moveEvent, onMove, {
        passive: !preventScroll,
      })

      return () => {
        document.removeEventListener(moveEvent, onMove)
      }
    }, [])

    return <Icy size={size} faces={faces} {...coords} ref={logo} />
  }
)

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
