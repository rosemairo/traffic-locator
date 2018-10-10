import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route } from "react-router-dom";
import History from './pages/History';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
<div>
    <Route exact path="/app" component={App} />
    <Route path="/history" component={History} /> 
    </div>
</BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
