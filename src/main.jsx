import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';


import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './Pages/Provider/AuthProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

Aos.init();

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>

    </div>
  </StrictMode>,
)
