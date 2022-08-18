import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import StudentCard from '../studentCard/StudentCard';
import SingleTextInput from '../singleTextInput/SingleTextInput';
import SearchBar from '../searchBar/SearchBar';
import EmptyView from '../emptyView/EmptyView';

import { Alert, Snackbar } from '@mui/material';

import './StudentList.scss'


export default function StudentList() {

    // hooks
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [tags, setTags] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    
    const location = useLocation();
    
    // functions
    function handleSearch(e) {
        const input = e.target.value;
        setSearchTerm(input);
    };

    function handleSearchTag(e) {
        const {value} = e.target;
        setSearchTag(value);
    };

    // useEffect() is what we use to populate the students array
    useEffect(() => {
        setLoading(true);

        const url = 'https://student-app-backend-ivan.herokuapp.com/students';

        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {            
            setStudents(data);
            setLoading(false);
        })

        if (location?.state?.studentName) {
            setOpenSnackbar(true)
            window.history.replaceState({}, document.title)
        }
        
    }, []); // empty array means run on mount

    let filteredStudents = students;
    if (searchTerm) {
        filteredStudents = students.filter((student) => {
            let fullName = `${student.firstname} ${student.lastname}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }
    if (searchTag) {
        let tagResults = tags.filter((tag) => {
            return tag.tagName.slice(0, searchTag.length).toLowerCase() === searchTag.toLowerCase()
        })

        filteredStudents = students.filter((student) => {
            for (let tag of tagResults) {
                if (student.id === tag.id) return true
            }
        })
    }


    
    // return or JSX
    return (
        <div className='studentList'>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={1500} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                <Alert>{location.state ? location.state.studentName : 'Student'} has been deleted</Alert>
            </Snackbar>
            
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
            {/* Replaced with old SearchBar */}
            {/* <SingleTextInput value={searchTerm} onChange={handleSearchName} placeHolder={'Search by name'} width={'97%'} /> */}

            <SingleTextInput value={searchTag} onChange={handleSearchTag} placeHolder={'Search by tag'} width={'97%'} />
            
            {filteredStudents.map((student) => {
                return (
                    <div key={student.id}>
                        <StudentCard student={student} tags={tags} setTags={setTags} />
                    </div>
                );
            })} 
            {/* Passing in the value 'center' automatically makes it a boolean, even though it's not defined, much like the way
            in MaterialUI or similar library, we can simply hand in flags such as "disabled" which equals a boolean,
            and it does not need to be defined */}
            {loading && <EmptyView text='Loading...' center />}

            {searchTerm && filteredStudents.length === 0 && <EmptyView center />}
            

        </div>
    );
};
