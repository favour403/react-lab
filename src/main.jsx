import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { store } from './redux/store.js'
 import { Provider } from 'react-redux'
  import { BrowserRouter } from 'react-router-dom'
  import { Toaster } from 'react-hot-toast'
  import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
   const query = new QueryClient ();
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store = {store}>
      <QueryClientProvider client={query}>
         <BrowserRouter>
    <Toaster position='top-right'
    toastOptions={{
      duration: 3000,
      success: {
         style:{
         background: 'green',
         color: 'white'
         }
      },
      error: {
         background: 'red',
         color: 'white'
      }
    }} />
    <App />
    </BrowserRouter>
    </QueryClientProvider>
   </Provider>
  </StrictMode>,
)
