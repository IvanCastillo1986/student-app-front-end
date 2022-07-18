import React from 'react'

import './SingleTextInput.scss'



export default function SingleTextInput({ handleKeyPress, value, onChange, placeHolder, display, width, border, fontSize, padding, margin }) {

    const styles = {
        'width': width,
        'border' : border,
        'fontSize': fontSize,
        'padding': padding,
        'margin': margin,
        'display': display,
    }


    return (
        <input 
            onKeyDown={handleKeyPress}
            style={styles}
            className='singleTextInput' 
            value={value} 
            onChange={onChange} 
            type="search" 
            placeholder={placeHolder} 
        />
    )
}
