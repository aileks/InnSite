import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/sessionSlice';
import ModalProvider, { Modal } from './context/Modal';
import { ToastProvider } from './context/Toast';
import store from './store';

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ToastProvider>
          <App />
          <Modal />
        </ToastProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
);
