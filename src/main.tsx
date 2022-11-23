import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store, StoreContext } from './stores/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreContext.Provider value={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreContext.Provider>
)
