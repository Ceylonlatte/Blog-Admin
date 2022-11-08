import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers'
import AuthRouter from '@/routers/utils/authRouter'

const App = () => {
  return (
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  )
}

export default App
