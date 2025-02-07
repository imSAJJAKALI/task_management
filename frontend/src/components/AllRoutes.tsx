import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Tasks'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <>
    <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={
          <PrivateRoute>
          <Dashboard/>
          </PrivateRoute>
          } />
        <Route path='/tasks' element={
          <PrivateRoute>
          <Tasks/>
          </PrivateRoute>
          } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
     </Routes>
     <Footer/>
    </>
  )
}

export default AllRoutes