import React from 'react'
import './main.scss'

export default class App extends React.Component {
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}
