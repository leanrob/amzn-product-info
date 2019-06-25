import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import productInfo from './reducers/productInfoReducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  productInfo,
})