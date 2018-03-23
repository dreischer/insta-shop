import React from 'preact'
import axios from 'axios'
import createAtom from 'tiny-atom'
import { ProvideAtom } from 'tiny-atom/preact'

import { getSavedUserInfo } from './utils/auth'
import App from './App'

window.Promise = window.Promise || require('es6-promise').Promise
window.React = React
window.axios = axios

let root

function initialState () {
  return Object.assign({},
    {
      user: getSavedUserInfo() || {},
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
    }
  )
}

const atom = createAtom(initialState(), evolve, render, {
  debug: console.log
})

function evolve (getState, split, action) {}

render()

function render () {
  root = React.render((
    <ProvideAtom atom={atom}>
      <App atom={atom} />
    </ProvideAtom>
  ), document.getElementById('root'), root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
