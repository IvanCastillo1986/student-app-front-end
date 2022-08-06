import React from 'react'

import StudentList from '../../components/studentList/StudentList'
import NavigationButton from '../../components/navigationButton/NavigationButton';


export default function Home() {

    
    return (
        <div className='home'>
            <NavigationButton buttonText='Add new student' url='/students/new' />
            <StudentList />
        </div>
    )
}
