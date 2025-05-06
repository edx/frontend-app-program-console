import 'babel-polyfill';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from '@edx/frontend-platform';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import messages from './i18n';
import configureStore from './store';

import './index.scss';
import App from './App';

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  const { store } = configureStore(process.env.NODE_ENV);
  rootNode.render(
    <StrictMode>
      <AppProvider store={store}>
        <App />
      </AppProvider>
    </StrictMode>,
  );

  sendPageEvent();
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<StrictMode><ErrorPage message={error.message} /></StrictMode>);
});

initialize({
  messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
