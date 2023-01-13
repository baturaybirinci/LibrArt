import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import LibrartNavbar from '../components/librart-navbar.js'
import { SSRProvider } from 'react-bootstrap'
import { store, persistor } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return(
    <SSRProvider>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
          </PersistGate>
      </Provider>
    </SSRProvider>
    )
}
