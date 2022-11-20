import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routers'
import AuthRouter from '@/routers/utils/authRouter'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  )
}

export default App
