import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '../../clinet-app/src/app/layout/style.css';

import './app/layout/style.css'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { router } from './app/router/Routes'; // <-- import your router, not App!
import { store, StoreContext } from './app/stores/store';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {
     <StoreContext.Provider value={store}>
         <RouterProvider router={router} />
     </StoreContext.Provider>


  // <QueryClientProvider client={queryClient} >  
  //     <ReactQueryDevtools />
  // <RouterProvider router={router} />
  //      </QueryClientProvider>  
       }
  </StrictMode>,
)
