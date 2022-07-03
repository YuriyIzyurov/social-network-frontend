import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <App/>
        </Provider>
);

reportWebVitals();
