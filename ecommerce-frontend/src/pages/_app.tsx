import { roboto } from '@/fonts/roboto'
import CartProvider from '@/modules/cart/context/CartProvider'
import ProductsProvider from '@/modules/products/context/ProductsProvider'
import '@/styles/globals.css'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ProductsProvider>
        <main className={roboto.className}>
          <CssBaseline />
          <Component {...pageProps} />
        </main>
      </ProductsProvider>
    </CartProvider>
  )
}
