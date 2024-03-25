import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import Animate from './pages/Animate'
import Login from './pages/Auth/Login'
import RequireAuth from './components/RequireAuth'
import Welcome from './pages/Welcome'
import UsersList from './pages/UsersList'


const App = () => {

  return (
    <>
      {/* <Animate /> */}

      <div className='px-4 py-2 border-b flex justify-start items-center gap-3'>
        <Link className='px-3 py-1 rounded-md bg-teal-300 shadow' to='/'>Home</Link>
        <Link className='px-3 py-1 rounded-md bg-teal-300 shadow' to="/userslist">Users</Link>
        <Link className='px-3 py-1 rounded-md bg-teal-300 shadow' to='/login'>Login</Link>
        <Link className='px-3 py-1 rounded-md bg-teal-300 shadow' to='/welcome'>welcome</Link>

      </div>

      <Routes>

        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>

      </Routes>
    </>
  )
}

export default App