import React, { useEffect, useState } from 'react';
import StudentCard from '../studentCard/StudentCard';
import SearchBar from '../searchBar/SearchBar';

import './StudentList.scss'


export default function StudentList() {

    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    
    // functions
    function handleSearch(e) {
        const input = e.target.value
        setSearchTerm(input)
    }

    // useEffect() is what we use to populate the students array
    useEffect(() => {
        const url = 'https://student-app-backend-ivan.herokuapp.com/students';

        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setStudents(data.students);
        })
        // get our students
        // update the students hook with the new data

        
    }, []); // empty array means run on mount
    
    function showSearchStudents(students) {

        const searchResults = students.filter(student => {
            return (
                student.firstName.slice(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase() 
                ||
                student.lastName.slice(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase()
            );
        });

        return searchResults.map((student) => {
            return (
                <div key={student.id}>
                    <StudentCard student={student} />
                </div>
            );
        });
    };

    let filteredStudents = students;
    if (searchTerm) {
        filteredStudents = students.filter((student) => {
            let fullName = `${student.firstName} ${student.lastName}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    
    // return or JSX
    return (
        <div className='studentList'>
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
            {/* {showSearchStudents(students)} */}
            
            {filteredStudents.map((student) => {
                return (
                    <div key={student.id}>
                        <StudentCard student={student} />
                    </div>
                );
            })} 
            {/* The object brackets automatically return within JSX. It's like using the 'return' keyword */}
            {filteredStudents.length == 0 && <div className='studentList__noResults'>No Results</div>}

        </div>
    );
};
