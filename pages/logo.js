import { PureComponent } from 'react'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Logo from '~/components/logo'

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

export default class extends PureComponent {
  state = {
    faces: [
      { image: 'A', reverse: false, eye: true },
      { image: 'A', reverse: false, eye: true },
    ],
  }

  changeFeature = feature => which => event => {
    const { checked, value } = event.target
    const isCheckbox = value === 'on'

    this.setState(({ faces }) => ({
      faces: faces.map((face, index) =>
        index === which
          ? { ...face, [feature]: isCheckbox ? checked : value }
          : face,
      ),
    }))
  }

  changeLetter = this.changeFeature('image')
  changeReverse = this.changeFeature('reverse')
  changeEye = this.changeFeature('eye')

  render() {
    const { faces } = this.state
    const [left, right] = faces

    return (
      <Layout
        path="logo"
        title="Logo"
        description="Play with our 3D logo and customize it to your liking!">
        <Row>
          <div className="col-xs-12 col-md-4">
            <article className="card card-1">
              <h1>Create your own Inglorious logo!</h1>

              <p>Simply play with the parameters below and see it live!</p>

              <form>
                <Row>
                  <div className="col-xs-6">
                    <label>First image:</label>
                  </div>
                  <div className="col-xs-6">
                    <select
                      autoFocus
                      value={left.image}
                      onChange={this.changeLetter(0)}>
                      {availableImages.map(image => (
                        <option key={image}>{image}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xs-6">
                    <label>Reverse:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={left.reverse}
                      onChange={this.changeReverse(0)}
                    />
                  </div>

                  <div className="col-xs-6">
                    <label>Eye:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={left.eye}
                      onChange={this.changeEye(0)}
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-xs-6">
                    <label>Second image:</label>
                  </div>
                  <div className="col-xs-6">
                    <select value={right.image} onChange={this.changeLetter(1)}>
                      {availableImages.map(image => (
                        <option key={image}>{image}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xs-6">
                    <label>Reverse:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={right.reverse}
                      onChange={this.changeReverse(1)}
                    />
                  </div>

                  <div className="col-xs-6">
                    <label>Eye:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={right.eye}
                      onChange={this.changeEye(1)}
                    />
                  </div>
                </Row>
              </form>
            </article>
          </div>

          <div className="col-xs-12 col-md-8">
            <section className="card card-1 logo-container">
              <Logo size={280} faces={faces} preventScroll={true} />
            </section>
          </div>
        </Row>

        <style jsx>{`
          .logo-container {
            padding-bottom: 3.5rem;
          }
        `}</style>
      </Layout>
    )
  }
}
