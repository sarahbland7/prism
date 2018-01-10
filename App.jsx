import React from 'react'

import {db} from './fire'

export default class Colors extends React.Component {
  componentWillMount() {
    this.unsubscribe =
      db.collection('colors')
        .onSnapshot(snap =>
          this.setState({
            colors: snap.docs.map(doc => doc.data())
          }))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (!this.state) return 'Loading...'
    const {colors} = this.state
    return <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
    }}> {
      colors.map(color => <div style={{
        width: '250px',
        height: '250px',
        margin: '9px',
        backgroundColor: rgb(color)
      }}>
      <pre>{JSON.stringify(color.names, 0, 2)}</pre>
      </div>)
    } </div>
  }
}

const rgb = color => `rgb(${color.red}, ${color.green}, ${color.blue})`