import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globalStyles'
import Theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
