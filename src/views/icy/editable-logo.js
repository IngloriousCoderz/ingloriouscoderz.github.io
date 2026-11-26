import { Logo } from "@inglorious/logo"

import { logoTilt } from "../../common/logo-tilt.js"

export const EditableLogo = [
  Logo,
  logoTilt,
  {
    faceChange(entity, { index, field, value }) {
      entity.faces[index][field] = value
    },
  },
]
