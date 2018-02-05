import React from 'preact'
import axios from 'axios'
import createAtom from 'tiny-atom'

import App from './App'

import createAtom from 'tiny-atom'

window.Promise = window.Promise || require('es6-promise').Promise
window.React = React
window.axios = axios

const atom = createAtom({}, evolve, render)

function evolve (getState, split, action) {
  const { type, payload } = action

  if (type === 'logout') {
    split({ user: payload || null })
  }
}

render()

let root

const atom = createAtom({
  header: {
    icon: null
  }
}, evolve, render)

function evolve (getState, split, action) {
  const { type, payload } = action

  if (type === 'header') {
    split({ header: payload })
  }
}

render()

function render () {
  root = React.render(<App atom={atom.get()} split={atom.split} />, document.getElementById('root'), root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
