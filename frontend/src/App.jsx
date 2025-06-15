import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './authenticate/ProtectedRoute'
import Profile from './pages/Profile'
import SearchUser from './pages/SearchUser'
import SearchResult from './pages/SearchResult'
import UserProfile from './pages/UserProfile'
import FriendList from './pages/FriendList'
import FriendReq from './pages/FriendReq'
import Chat from './pages/Chat'
import FullChat from './pages/FullChat'
import ChatDetails from './pages/ChatDetails'
function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route element={<ProtectedRoute />}>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/searchuser' element={<SearchUser />} />
        <Route path='/searchresult' element={<SearchResult />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/friends' element={<FriendList />} />
        <Route path='/myreq' element={<FriendReq />} />
        <Route path='/chats' element={<Chat />} />
        <Route path='/fullchat' element={<FullChat/>} />
        <Route path='/chatdetails' element={<ChatDetails/>} />
        </Route>
        {/* <Route path='/verify' element={<ProtectedRoute />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
