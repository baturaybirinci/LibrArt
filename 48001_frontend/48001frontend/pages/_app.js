import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import LibrartNavbar from '../components/librart-navbar.js'
import { SSRProvider } from 'react-bootstrap'

export default function App({ Component, pageProps }) {
  return(
    
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>)
}
