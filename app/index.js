import React from 'preact'
import axios from 'axios'
import createAtom from 'tiny-atom'

import { getSavedUserInfo } from './utils/Auth'
import App from './App'

window.Promise = window.Promise || require('es6-promise').Promise
window.React = React
window.axios = axios

let root

const atom = createAtom({
  user: getSavedUserInfo() || null,
  feed: {
    nodes: null,
    nextPointer: null,
    hasNextPage: true
  },
  products: null,
  selection: {
    nodes: null,
    selectionIds: null
  }
}, evolve, render)

function evolve (getState, split, action) {}

render()

function render () {
  root = React.render(<App atom={atom} />, document.getElementById('root'), root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
