import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
// import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
// import thunk from 'redux-thunk'

export default function App({ Component, pageProps }: AppProps) {

  // const store = createStore()

  return (
    // <Provider store={store} >
      <Component {...pageProps} />
    // </Provider>
  )
}
