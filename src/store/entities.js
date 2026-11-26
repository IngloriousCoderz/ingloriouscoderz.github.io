const LOGO_SIZE = 256
const DEFAULT_FACES = [
  { image: "I", reverse: false, eye: true },
  { image: "C", reverse: false, eye: false },
]

export const entities = {
  // Pointer tracking is switched on per page by the navigation entity.
  logo: {
    type: "Logo",
    size: LOGO_SIZE,
    isInteractive: false,
    faces: DEFAULT_FACES.map((face) => ({ ...face })),
  },
  navigation: { type: "Navigation" },
  analytics: { type: "Analytics" },
}
