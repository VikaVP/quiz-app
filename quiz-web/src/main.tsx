import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { globalStore, persistor } from './config/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './app/routing/Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style/global.css'
import './index.css'
import NavbarQuiz from './components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootElement = document.querySelector('[data-js="root"]')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={globalStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <NavbarQuiz />
            <Routing />
            <ToastContainer
              position='top-center'
              autoClose={4000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme='colored'
            />
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </StrictMode>,
)
