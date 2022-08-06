import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import './NavigationButton.scss'



export default function NavigationButton({ buttonText, url }) {

    
    return (
        <div className='navigationButton'>
            <Link to={url} >
                <Button
                    variant="contained" 
                    size="large" 
                >
                    {buttonText}
                </Button>
            </Link>
        </div>
    )
}
