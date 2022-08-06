import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './layout/navbar/NavBar';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import StudentDetailsPage from './pages/StudentDetailsPage';
import AddStudentPage from './pages/AddStudentPage';


import './App.scss';


// create new student
// add button to student list page/home page

// on click move to students/new
  // showing form to create new student

    // on error, show toast with message to try again later
    // on success, redirect to student detail page of new student
      // show success toast that new student was created


function App() {

  return (
    <div className="App">
      <NavBar />
      <div className='pageContainer'>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/students/new" element={<AddStudentPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/students/:id" element={<StudentDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


// When making calls to an API, try to call it directly from the component that needs it (not always possible)
// Many people will make the call directly from App, even though it can be contained within 
// StudentList, since this is the only component (and its child components) which will need it.
// We don't need it for StudentDetailsPage, since the data gets passed through the <Link>.