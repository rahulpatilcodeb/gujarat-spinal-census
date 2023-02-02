import Navbars from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from "@/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from '@/components/Contact';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbars />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
