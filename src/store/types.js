import { Logo } from "@inglorious/logo"

import { Analytics } from "../app/analytics/index.js"
import { Navigation } from "../app/navigation/index.js"
import { logoTilt } from "../common/logo-tilt.js"
import { EditableLogo } from "../views/icy/editable-logo.js"

export const types = {
  Logo: [Logo, logoTilt],
  EditableLogo,
  Navigation,
  Analytics,
}
