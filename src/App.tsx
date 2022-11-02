import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers'

const App = () => {
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  )
}

export default App
