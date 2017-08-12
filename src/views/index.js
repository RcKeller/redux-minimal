import React from 'react'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import FontIcon from 'react-md/lib/FontIcons'

import { Link } from 'react-router'

const logo = '/img/logo.svg'
//  Core styles
// import 'font-awesome/scss/font-awesome.scss'
import './main.scss'
//  Top-Level UI (Navigation, wrappers, etc)
class UI extends React.Component {
  render ({ children } = this.props) {
    return (
      <NavigationDrawer
        drawerTitle='Navigation'
        contentClassName='main-content'
        navItems={[]}
        autoclose
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
        toolbarTitle={
          <Link to='/' className='toolbar-title'>
            <img src={logo} alt='Site Logo' className='toolbar-avatar' />
            <h2 className='toolbar-title-text'>
              {'LocalTitle'}
            </h2>
          </Link>
        }
        toolbarActions={
          <div className='toolbar-actions'>
            <div className='userlinks-container'>
              {/* <UserLinks config={config} /> */}
            </div>
          </div>
        }
        >
        <div className='container'>{children}</div>
        <footer>Footer</footer>
      </NavigationDrawer>
    )
  }
}
export default UI
