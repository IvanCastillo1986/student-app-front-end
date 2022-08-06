import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import StudentCard from '../components/studentCard/StudentCard';
import StudentForm from '../components/studentForm/StudentForm';

import { Alert, Snackbar } from '@mui/material';



export default function StudentDetailsPage(props) {

    const { id } = useParams();
    const location = useLocation();
    const [student, setStudent] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false)

    // The ? is an optional chaining operator, telling js that if item is not present, 
    // do not throw error, and give null instead. It stops anything past 'state' from parsing
    useEffect(() => {

        // if (location.state?.student) {
        //     setStudent(location.state?.student)
        // } else {
            if (location.state.fromCreateStudent) {
                setOpenSnackbar(true)
            }
            fetch(`https://student-app-backend-ivan.herokuapp.com/students/${id}`)
                // The line below was causing me an error, because it didn't have anything to parse as json. 
                // I accidentally fetched the variable of ${student.id} when there was no student object yet, 
                // because we weren't rendering it unless we clicked on <Link> component instead of typing direct url
                .then(response => response.json())
                .then(data => {
                    setStudent(data)
                })
        // }
    }, []);
    // update student
    // create update component
    // with form for all fields
    // on submit, show loader
    // on success, show toast (success - green)
    // on fail, show toast (error - red)
    // update data on student page


    return (
        <div className='studentDetailsPage'>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={1500} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                <Alert>{location.state ? location.state.studentName : 'Student'} has been created</Alert>
            </Snackbar>
            {/* If the student object does not exist yet, do not render. 
            This will cause errors when rendering props in the child components */}
            {Object.keys(student).length > 0 && <StudentCard student={student} showDelete />}
            {Object.keys(student).length > 0 && <StudentForm student={student} setStudent={setStudent} />}
        </div>
    );
};
