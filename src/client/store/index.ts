import { combineReducers, createStore } from 'redux';

import token from './token';

const reducer = combineReducers({ token });

/* eslint-disable no-underscore-dangle */
export const Store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export type State = ReturnType<typeof Store.getState>;

export default Store;
