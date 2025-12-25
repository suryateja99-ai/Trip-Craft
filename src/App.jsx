import Navbar from './Frontend/Navbar'
import Header from './Frontend/Header'
import { Routes, Route } from 'react-router-dom'
import Body from './Frontend/Body'
import How from './Frontend/How'
import TripIdeas from './Frontend/TripIdeas'
import Contact from './Frontend/Contact'

function App() {
  return (
    <>
      <Header/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/trip-ideas" element={<TripIdeas/>} />
        <Route path="/how-this-works" element={<How/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </>
  )
}

export default App

