import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiOutlineReload } from 'react-icons/ai';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import './StudentUpdateForm.scss'



export default function StudentUpdateForm({ student, setStudent }) {

    const [firstname, setFirstname] = useState(student.firstname)
    const [lastname, setLastname] = useState(student.lastname)
    const [company, setCompany] = useState(student.company)
    const [city, setCity] = useState(student.city)
    const [skill, setSkill] = useState(student.skill)
    const [pic, setPic] = useState(student.pic)
    const [email, setEmail] = useState(student.email)
    const [noChanges, setNoChanges] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [successfulUpdate, setSuccessfulUpdate] = useState(true)

    const handleChange = (e) => {
        setNoChanges(false)
        switch (e.target.name) {
            case 'firstname':
                setFirstname(e.target.value)
                break;
            case 'lastname':
                setLastname(e.target.value)
                break;
            case 'company':
                setCompany(e.target.value)
                break;
            case 'city':
                setCity(e.target.value)
                break;
            case 'skill':
                setSkill(e.target.value)
                break;
            case 'pic': 
                setPic(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        // set loading state
        setLoading(true)
        
        // set our target url
        const url = `https://student-app-backend-ivan.herokuapp.com/students/${student.id}`

        // what data are we passing to our backend?
        // what http method are we using
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: firstname, lastName: lastname, company, city, skill, pic, email })
        }

        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                // there are two types of errors we can get here:
                // one is, we can get a response back, that just returns a response which 
                // isn't what we expected in which case we want to handle this as an error
                console.log('Has accomplished update and fetched data')
                console.log(data)
                setNoChanges(true)
                setSuccessfulUpdate(true)
                setShowSnackbar(true)
                setLoading(false)
                setStudent(data)
            }).catch(err => {
                console.log('catching error, should setLoading false and setSnackbar true')
                setLoading(false)
                // Let user know an error has occurred
                setSuccessfulUpdate(false)
                setShowSnackbar(true)
            })
    }

    const errorElement = <Alert severity="error">An error occured while updating</Alert>
    const successElement = <Alert severity="success">Student updated successfully!</Alert>

    return (
        <div className='studentUpdateForm'>
            <Snackbar 
                open={showSnackbar} 
                autoHideDuration={1500} 
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {successfulUpdate ? successElement : errorElement} 
            </Snackbar>
            <div className='studentUpdateForm__title'>Update Form</div>
            <div className='studentUpdateForm__inputs'>
                <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    value={firstname} 
                    name='firstname' 
                    onChange={(e) => handleChange(e)} 
                />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastname} name='lastname' onChange={(e) => handleChange(e)} />
                <TextField id="outlined-basic" label="Company" variant="outlined" value={company} name='company' onChange={(e) => handleChange(e)} />
                <TextField id="outlined-basic" label="City" variant="outlined" value={city} name='city' onChange={(e) => handleChange(e)} />
                <TextField id="outlined-basic" label="Skill" variant="outlined" value={skill} name='skill' onChange={(e) => handleChange(e)} />
                <TextField id="outlined-basic" label="Pic url" variant="outlined" value={pic} name='pic' onChange={(e) => handleChange(e)} />
                <TextField id="outlined-basic" label="E-mail" variant="outlined" value={email} name='email' onChange={(e) => handleChange(e)} />
            </div>
            <div className='studentUpdateForm__submit'>
                <Button 
                    variant="contained" 
                    size="large" 
                    disabled={noChanges} 
                    onClick={handleSubmit} 
                    endIcon={loading && <AiOutlineReload className="studentUpdateForm__submitLoader-spinning" />}>
                    Update
                </Button>
            </div>
        </div>
    )
}
