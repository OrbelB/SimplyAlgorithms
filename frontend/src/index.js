/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { enableMapSet } from 'immer';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import './index.css';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { fetchTags } from './services/tag';
import { fetchWikiLinks, fetchSubCategories } from './services/wiki';
import interceptors from './services/Api/interceptors';

interceptors(store);
store.dispatch(
  fetchTags({
    page: 0,
    size: 15,
  })
);
let theme = createTheme();
theme = responsiveFontSizes(theme);
enableMapSet();
store.dispatch(fetchWikiLinks());
store.dispatch(fetchSubCategories());
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
