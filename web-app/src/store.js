import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

/**
 * Store: Bringing it all together
 * --> Store brings the reducers, the initial State and the middleware
 * --> Allows access to the state which is set by the reducers
 * --> Store is accessed through the applications
 * @type {Store<{}>}
 */
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store