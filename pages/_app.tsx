import Navbars from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import image from '@/public/gsc.svg'
// import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Head>
        <title>GSC</title>
        <link rel="icon" href={image.src} />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <Navbars />
          <Component {...pageProps} />
          <Footer />

        </PersistGate>
      </Provider>
    </>
  );
}
// export default appWithTranslation(App);
export default App;