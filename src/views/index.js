import React from 'react'

import { Link } from 'react-router'

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import Button from 'react-md/lib/Buttons'
import FontIcon from 'react-md/lib/FontIcons'

//  Top-Level UI (Navigation, wrappers, etc)
import './main.scss'
class UI extends React.Component {
  constructor (props) {
    super(props)
    const navItems = [
      {
        primaryText: 'Home',
        secondaryText: 'Main Page',
        leftIcon: <FontIcon>home</FontIcon>,
        component: Link,
        to: '/'
      }, {
        primaryText: 'Demo Page',
        secondaryText: 'Typography Demo',
        leftIcon: <FontIcon>school</FontIcon>,
        component: Link,
        to: '/demo'
      },
      { divider: true }
    ]

    const links = [{ label: 'GitHub', url: 'https://github.com/RcKeller/', iconClassName: 'fa fa-github' }]

    this.state = { navItems, links }
  }
  render (
    { children } = this.props,
    { navItems, links } = this.state
  ) {
    return (
      <NavigationDrawer
        drawerTitle='Navigation'
        navItems={navItems}
        autoclose
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
        toolbarTitle={
          <Link to='/' className='toolbar-title'>
            <img src='/img/logo.svg' alt='Site Logo' />
            <h2>{'LocalTitle'}</h2>
          </Link>
        }
        toolbarActions={
          <div>
            {links.map(link =>
              <Button key={link.label} secondary icon
                iconClassName={link.iconClassName}
                href={link.url}
              />
            )}
          </div>
        }
      >
        <div>
          <div className='page'>{children}</div>
          <footer>Red, <span>blue</span></footer>
        </div>
      </NavigationDrawer>
    )
  }
}
export default UI
