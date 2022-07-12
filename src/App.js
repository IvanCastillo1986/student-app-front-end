import React from 'react'
import { Routes, Route } from 'react-router-dom'

import StudentList from './components/studentList/StudentList';
import StudentDetailsPage from './pages/StudentDetailsPage';


import './App.scss';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
