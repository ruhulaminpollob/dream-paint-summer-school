import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Routes/Routes.jsx'

import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>

      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
