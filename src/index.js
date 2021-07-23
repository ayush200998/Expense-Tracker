import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SpeechProvider } from '@speechly/react-client'
import { Provider } from './context/context'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId='b9a82efa-c640-478e-9c85-347ba186fffa' language='en-US'>
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

