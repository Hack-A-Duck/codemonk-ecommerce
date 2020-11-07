import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './ContextProvider';
import  reducer,{ initialState} from "./reducer";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider initialState = {initialState} reducer = {reducer} >
    <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

