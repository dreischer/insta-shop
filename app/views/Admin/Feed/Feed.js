import React, { Component } from 'preact'

import InstaFeed from './InstaFeed.js'
import Selection from './Selection.js'

import './Feed.css'

export default class Feed extends Component {
  constructor (props) {
    super(props)
    const atom = props.atom.get()
    this.state = {
      selection: atom.selection.nodes || [],
      selectionIds: atom.selection.selectionIds || []
    }
  }

  componentDidMount () {
    this.setIds()
  }

  setIds () {
    const selectionIds = this.state.selection.map(node => node.id)
    this.setState({ selectionIds })
  }

  addToSelection (node) {
    if (this.state.selectionIds.indexOf(node.id) === -1) {
      const selection = [node, ...this.state.selection].sort((a, b) => b.date - a.date)
      const selectionIds = [node.id, ...this.state.selectionIds]
      this.setState({ selection, selectionIds })
      this.props.atom.split({
        selection: {
          nodes: selection,
          selectionIds
        }
      })
    }
  }

  render (props, state) {
    const { atom } = props

    return (
      <div style='width: 100%;' class='feed'>
        <div class='half-feed'>
          <Selection selection={state.selection} atom={atom} />
        </div>
        <div class='half-feed'>
          <InstaFeed selectionIds={state.selectionIds} addToSelection={this.addToSelection.bind(this)} atom={atom} />
        </div>
      </div>
    )
  }
}
