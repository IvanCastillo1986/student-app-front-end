import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './NavBar.scss'


const menuItems = [
    {
        label: "Students",
        url: "/"
    },
    {
        label: "About",
        url: "/about"
    },
    {
        label: "Contact",
        url: "/contact"
    }
]


export default function NavBar(props) {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className='navbar'>
            <div className='navbar__logo'>Student App</div>

            <div className={`navbar__menuItems ${showMenu && 'active'}`}>
                <ul>
                    {menuItems.map((menuItem, key) => {
                        return(
                        <li key={key}>
                            <Link to={menuItem.url}>{menuItem.label}</Link>
                        </li>
                        )
                    })}
                </ul>
            </div>
            <div className="navbar__hamburger" onClick={() => {setShowMenu(!showMenu)}}>=</div>
        </div>
    )
}
