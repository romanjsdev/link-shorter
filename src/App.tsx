import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import store from './store'
import { Provider } from 'react-redux'
import Layout from './components/Layout'
import Statistics from './components/Statistics'
import LoginForm from './components/LoginForm'
import { FormType } from './types'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Statistics />} />
              <Route path="/register" element={<LoginForm type={FormType.REGISTER} />} />
              <Route path="/login" element={<LoginForm type={FormType.LOGIN} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
