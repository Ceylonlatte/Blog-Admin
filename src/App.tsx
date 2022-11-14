import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers'
import AuthRouter from '@/routers/utils/authRouter'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
