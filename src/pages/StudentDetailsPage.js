import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import StudentCard from '../components/studentCard/StudentCard';



export default function StudentDetailsPage(props) {

    const { id } = useParams();
    const location = useLocation();
    const [student, setStudent] = useState({});

    // The ? is an optional chaining operator, telling js that if item is not present, 
    // do not throw error, and give null instead. It stops anything past 'state' from parsing
    useEffect(() => {

        if (location.state?.student) {
            setStudent(location.state?.student)
        } else {
            fetch(`https://student-app-backend-ivan.herokuapp.com/students/${id}`)
                // The line below was causing me an error, because it didn't have anything to parse as json. 
                // I accidentally fetched the variable of ${student.id} when there was no student object yet, 
                // because we weren't rendering it unless we clicked on <Link> component instead of typing direct url
                .then(response => response.json())
                .then(data => {
                    setStudent(data)
                })
        }
    }, []);
    
    // with the student id, we can fetch student info from our API

    // delete student
    // add icon to detail page
    // on click open confirm dialog
    // on cancel, close dialog

    // on confirm, show loader while delete happens
    // on error, show toast that delete was not successful
    // on success, redirect to home page and show toast that user was deleted

    return (
        <div className='studentDetailsPage'>
            {Object.keys(student).length > 0 && <StudentCard student={student} showDelete />}
        </div>
    );
};
