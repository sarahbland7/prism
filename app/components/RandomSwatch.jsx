import React, { Component } from 'react';

export default class RandomSwatch extends Component {
  componentDidMount() {
    this.nextColor()
  }

  nextColor = () =>
    fetch('/api/colors')
      .then(res => res.json())
      .then(color => {console.log(color); this.setState(color)})
      .catch(console.error)

  render() {
    const {name='black', r=0, g=0, b=0} = this.state || {}
    return (
      <div onClick={this.nextColor}
        style={{
          transition: '218ms',
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0', left: '0', bottom: '0', right: '0',
        }}>
        <span className='color-name' style={{
          color: 'white',
          fontFamily: 'Menlo',
          textShadow: 'black 2px 2px 2px',
          position: 'absolute',
          bottom: '9px', left: '9px',
        }}>{name} </span>
      </div>
    )
  }
}
