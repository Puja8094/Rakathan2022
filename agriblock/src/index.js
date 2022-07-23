import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import NftProvider from './frontend/NftContext/NftProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NftProvider>
        <BrowserRouter>
            <Web3ReactProvider getLibrary={getLibrary}>
                <App />
            </Web3ReactProvider>
      </BrowserRouter>
    </NftProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
