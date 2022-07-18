import React, { useEffect, useState } from 'react';

import StudentCard from '../studentCard/StudentCard';
import SingleTextInput from '../singleTextInput/SingleTextInput';

import './StudentList.scss'


export default function StudentList() {

    // hooks
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
        const url = 'https://student-app-backend-ivan.herokuapp.com/students';

        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // TEMPORARILY ADDING GRADES SINCE IT DOESN'T EXIST IN DATABASE
            // let students = data.map(student => {
            //     student.grades = [68, 93, 90, 82]
            //     return student
            // })
            
            setStudents(data);
        })
        // get our students
        // update the students hook with the new data
        // const tempGrades = [68, 93, 90, 82]
        // const tempStudents = students.map(student => {
        //     student.grades = tempGrades
        // })
        // setStudents(tempStudents)
        // console.log(tempStudents)
        
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
            let fullName = `${student.firstName} ${student.lastName}`;
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
            {/* {filteredStudents.length == 0 && <div className='studentList__noResults'>No Results</div>} */}

        </div>
    );
};
