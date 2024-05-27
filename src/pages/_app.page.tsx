import { globalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import React from 'react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
