import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import freeze from 'redux-freeze'
import { reducers } from './reducers/index'

// add the middlewares
let middlewares = [
  thunk,
  routerMiddleware(browserHistory)
]
// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
  middlewares.push(createLogger())
}

// apply the middleware
let middleware = applyMiddleware(...middlewares)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  // middleware = compose(middleware, window.devToolsExtension())
}

// create the store
const store = createStore(reducers, middleware)
const history = syncHistoryWithStore(browserHistory, store)

// export
export { store, history }
