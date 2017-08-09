import React from 'react'

//  Core styles
import './main.scss'

//  Top-Level UI (Navigation, wrappers, etc)
class UI extends React.Component {
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}
export default UI
