import Navbars from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from '@/components/Contact';
import { Provider } from 'react-redux';
import {persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
// import style from "@/styles/loader.css"


export default function App({ Component, pageProps }: AppProps) {



  return (
    <>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>  
      
      <Navbars />
      <Component {...pageProps} />
      {/* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */}
      <Footer />
      
      </PersistGate>
      </Provider>
    </>
  );
}
