import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVETOOLS_EXTENSION__ && window.__REDUX_DEVETOOLS_EXTENSION__())}>
    <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
  