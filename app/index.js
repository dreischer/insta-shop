import React from 'preact'
import App from './App'
import axios from 'axios'

window.Promise = window.Promise || require('es6-promise').Promise
window.React = React
window.axios = axios

render()

let root

function render () {
  root = React.render(<App />, document.getElementById('root'), root)
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./App', render)
}
