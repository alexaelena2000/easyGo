import '../styles/globals.css'
import { MantineProvider} from '@mantine/core';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
     <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
