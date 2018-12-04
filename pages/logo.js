import { PureComponent } from 'react'

import Layout from '~/layouts/default'
import Row from '~/components/row'
import Logo from '~/components/logo'

const availableLetters = [
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
    first: { letter: 'A', reverse: false },
    second: { letter: 'A', reverse: false },
  }

  changeLetter = which => event => {
    const letter = event.target.value
    this.setState(prevState => ({
      [which]: {
        letter,
        reverse: prevState[which].reverse,
      },
    }))
  }

  changeReverse = which => event => {
    const reverse = event.target.checked
    this.setState(prevState => ({
      [which]: {
        letter: prevState[which].letter,
        reverse,
      },
    }))
  }

  render() {
    const { first, second } = this.state

    return (
      <Layout>
        <Row>
          <div className="col-xs-12 col-md-4">
            <section className="card card-1">
              <h1>Create your own Inglorious logo</h1>

              <p>
                Simply select the two letters you want to show and see it live!
              </p>

              <form>
                <Row>
                  <div className="col-xs-6">
                    <label>First letter:</label>
                  </div>
                  <div className="col-xs-6">
                    <select
                      autoFocus
                      value={first.letter}
                      onChange={this.changeLetter('first')}>
                      {availableLetters.map(letter => (
                        <option key={letter}>{letter}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-xs-6">
                    <label>Reverse:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={first.reverse}
                      onChange={this.changeReverse('first')}
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-xs-6">
                    <label>Second letter:</label>
                  </div>
                  <div className="col-xs-6">
                    <select
                      value={second.letter}
                      onChange={this.changeLetter('second')}>
                      {availableLetters.map(letter => (
                        <option key={letter}>{letter}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-xs-6">
                    <label>Reverse:</label>
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="checkbox"
                      checked={second.reverse}
                      onChange={this.changeReverse('second')}
                    />
                  </div>
                </Row>
              </form>
            </section>
          </div>

          <div className="col-xs-12 col-md-8">
            <section className="card card-1">
              <Logo
                size={280}
                letters={[first.letter, second.letter]}
                reverse={[first.reverse, second.reverse]}
              />
            </section>
          </div>
        </Row>
      </Layout>
    )
  }
}
