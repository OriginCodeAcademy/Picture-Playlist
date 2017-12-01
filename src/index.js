import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

//CSS
import './css/App.css';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
registerServiceWorker();
