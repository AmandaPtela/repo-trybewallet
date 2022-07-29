import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redux/reducers'
import thunk from "redux-thunk";

const storeGeral = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);
console.log(storeGeral.getState());

 if (window.Cypress) {
  window.store = storeGeral;
}
export default storeGeral;
