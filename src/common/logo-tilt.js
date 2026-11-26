const HALF_TURN_DEGREES = 180
const DEGREES_PER_RADIAN = HALF_TURN_DEGREES / Math.PI

/**
 * Works around @inglorious/logo 3, whose handler writes the pointer to `x`/`y`
 * while its template reads `position`, in degrees with a step still sized for
 * radians. Remove once the package is fixed.
 */
export const logoTilt = {
  coordsChange(entity, { x, y }) {
    entity.position = [x * DEGREES_PER_RADIAN, y * DEGREES_PER_RADIAN]
  },
}
