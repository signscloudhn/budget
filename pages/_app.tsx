// 'use-client'
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "../redux/store"
// import { legacy_createStore as createStore } from "redux"
// import rootReducer from "../redux/rootReducer"
// // import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
// // import thunk from 'redux-thunk'
import { useEffect } from 'react';
// // const store = createStore(rootReducer)

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
