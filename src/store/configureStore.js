import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export default ()=>{
  let store = createStore(persistedReducer, composeEnhances(
    applyMiddleware(thunk)
    )) 
  let persistor = persistStore(store)
  
  return{
    store,
    persistor
  }
}