import React, { useEffect, useState } from 'react';

import StudentCard from '../studentCard/StudentCard';
import SingleTextInput from '../singleTextInput/SingleTextInput';
import EmptyView from '../emptyView/EmptyView';

import './StudentList.scss'


export default function StudentList() {

    // hooks
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [tags, setTags] = useState([]);


    
    // functions
    function handleSearchName(e) {
        const input = e.target.value;
        setSearchTerm(input);
    };

    function handleSearchTag(e) {
        const {value} = e.target;
        setSearchTag(value);
    };

    // useEffect() is what we use to populate the students array
    useEffect(() => {
        setLoading(true)

        const url = 'https://student-app-backend-ivan.herokuapp.com/students';

        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {            
            console.log(data)
            setStudents(data);
            setLoading(false)
        })
        
    }, []); // empty array means run on mount
    
    // ANOTHER WAY OF RENDING StudentCard
    // function showSearchStudents(students) {

    //     const searchResults = students.filter(student => {
    //         return (
    //             student.firstName.slice(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase() 
    //             ||
    //             student.lastName.slice(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase()
    //         );
    //     });

    //     return searchResults.map((student) => {
    //         return (
    //             <div key={student.id}>
    //                 <StudentCard student={student} />
    //             </div>
    //         );
    //     });
    // };

    let filteredStudents = students;
    if (searchTerm) {
        filteredStudents = students.filter((student) => {
            let fullName = `${student.firstname} ${student.lastname}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }
    // if (searchTag) {
    //     filteredStudents = students.filter((student) => {

    //     });
    // }


    
    // return or JSX
    return (
        <div className='studentList'>
            <SingleTextInput value={searchTerm} onChange={handleSearchName} placeHolder={'Search by name'} width={'97%'} />
            {/* {showSearchStudents(students)}

            {/* <SingleTextInput value={searchTag} onChange={handleSearchTag} placeHolder={'Search by tag'} width={'97%'} /> */}
            
            {filteredStudents.map((student) => {
                return (
                    <div key={student.id}>
                        <StudentCard student={student} tags={tags} setTags={setTags} />
                    </div>
                );
            })} 
            {/* The object brackets automatically return within JSX. It's like using the 'return' keyword */}
            {/* Passing in the value 'center' automatically makes it a boolean, even though it's not defined, much like the way
            in MaterialUI or similar library, we can simply hand in flags such as "disabled" which equals a boolean,
            and it does not need to be defined */}
            {loading && <EmptyView text='Loading...' center />}

            {searchTerm && filteredStudents.length === 0 && <EmptyView center />}
            

        </div>
    );
};
