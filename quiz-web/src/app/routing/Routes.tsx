import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../../pages/Login'
import { Register } from '../../pages/Register'
import { Dashboard } from '../../pages/Dashboard'
import User from '../../pages/User'
import Quiz from '../../pages/Quiz'
import TryQuiz from '../../pages/TryQuiz'
import { useSelector } from 'react-redux'
import { RootState } from '../../config/redux/store'

const Routing: FC = () => {
  const { user } = useSelector((store: RootState) => store.auth)

  return (
    <Routes>
      {!user
        ? (
          <>
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route
              path='*'
              element={<Navigate to='/login' replace />}
            />
          </>
          )
        : (
          <>
            <Route path='/' Component={Dashboard} />
            {
            user.role === 'admin'
              ? <>
                <Route path='/user' Component={User} />
                <Route path='/quiz' Component={Quiz} />
              </>
              : <Route path='/try-quiz' Component={TryQuiz} />
          }

            <Route
              path='*'
              element={<Navigate to='/' replace />}
            />
          </>
          )}
    </Routes>
  )
}

export { Routing }
