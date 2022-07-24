import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './layout/navbar/NavBar';
import StudentList from './components/studentList/StudentList';
import StudentDetailsPage from './pages/StudentDetailsPage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';


import './App.scss';


function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index path="/" element={<StudentList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/students/:id" element={<StudentDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;


// When making calls to an API, try to call it directly from the component that needs it (not always possible)
// Many people will make the call directly from App, even though it can be contained within 
// StudentList, since this is the only component (and its child components) which will need it.
// We don't need it for StudentDetailsPage, since the data gets passed through the <Link>.