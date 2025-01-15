import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';

function App() {

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <UserProtectedWrapper>
            <Dashboard />
          </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />


      </Routes>
    </>
  )
}

export default App
