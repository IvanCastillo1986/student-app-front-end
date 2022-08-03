import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import StudentCard from '../components/studentCard/StudentCard';
import StudentUpdateForm from '../components/studentUpdateForm/StudentUpdateForm';



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
    
    // update student
    // create update component
    // with form for all fields
    // on submit, show loader
    // on success, show toast (success - green)
    // on fail, show toast (error - red)



    return (
        <div className='studentDetailsPage'>
            {Object.keys(student).length > 0 && <StudentCard student={student} showDelete />}
            <StudentUpdateForm student={student} />
        </div>
    );
};
