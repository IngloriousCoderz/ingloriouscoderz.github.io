import { useState } from 'react'
import { Trans } from 'react-i18next'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Icy from '~/components/icy'

const availableImages = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export default () => {
  const [faces, setFaces] = useState([
    { image: 'I', reverse: false, eye: true },
    { image: 'C', reverse: false, eye: false },
  ])

  const changeFeature = (feature) => (which) => (event) => {
    const { checked, value } = event.target
    const isCheckbox = value === 'on'

    setFaces(
      faces.map((face, index) =>
        index === which
          ? { ...face, [feature]: isCheckbox ? checked : value }
          : face
      )
    )
  }

  const changeLetter = changeFeature('image')
  const changeReverse = changeFeature('reverse')
  const changeEye = changeFeature('eye')

  const [left, right] = faces

  return (
    <Layout
      path="icy"
      title="Icy"
      description="Play with Icy, our 3D logo, and customize it to your liking!"
    >
      <Trans>
        <article className="card card-1">
          <h1>Icy</h1>

          <p>
            Meet Icy, our Inglorious Logo! It's a CSS3 cube with SVG faces that
            captures mouse movement (or finger swipe on mobile). Its name is Icy
            because its faces are an 'I' and a 'C'. Also, its catchphrase is "I
            see...".
          </p>
          <p>
            Why don't you try and make your own Inglorious logo? You can give
            life to Amy, or Guy, or even Qzy!
          </p>
        </article>

        <Row>
          <div className="col-xs-12 col-md-4">
            <article className="card card-1">
              <h2>
                This is your own {faces[0].image}
                {faces[1].image.toLowerCase()}y
              </h2>

              <p>
                Simply play with the parameters below and see it change live!
              </p>

              <form>
                <Row>
                  <div className="col-xs-6">
                    <label>Left side</label>
                  </div>
                  <div className="col-xs-6">
                    <select
                      autoFocus
                      value={left.image}
                      onChange={changeLetter(0)}
                    >
                      {availableImages.map((image) => (
                        <option key={image}>{image}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xs-6">
                    <label>Reverse</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={left.reverse}
                      onChange={changeReverse(0)}
                    />
                  </div>

                  <div className="col-xs-6">
                    <label>Eye</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={left.eye}
                      onChange={changeEye(0)}
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-xs-6">
                    <label>Right side</label>
                  </div>
                  <div className="col-xs-6">
                    <select value={right.image} onChange={changeLetter(1)}>
                      {availableImages.map((image) => (
                        <option key={image}>{image}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xs-6">
                    <label>Reverse</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={right.reverse}
                      onChange={changeReverse(1)}
                    />
                  </div>

                  <div className="col-xs-6">
                    <label>Eye</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={right.eye}
                      onChange={changeEye(1)}
                    />
                  </div>
                </Row>
              </form>
            </article>
          </div>

          <div className="col-xs-12 col-md-8">
            <section className="card card-1 logo-container">
              <Icy size={280} faces={faces} preventScroll={true} />
            </section>
          </div>
        </Row>
      </Trans>

      <style jsx>
        {`
          .logo-container {
            padding-bottom: 0.25rem;
          }
        `}
      </style>
    </Layout>
  )
}
