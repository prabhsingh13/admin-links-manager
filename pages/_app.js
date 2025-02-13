// pages/_app.js

import '../styles/global.css' // Import your global CSS file
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
