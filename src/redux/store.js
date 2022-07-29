import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const storeGeral = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);
console.log(storeGeral.getState());

if (window.Cypress) {
  window.store = storeGeral;
}
export default storeGeral;
