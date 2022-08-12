import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

    let navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [showNavbarItems, setShowNavbarItems] = useState(false)

    useEffect(() => {
        if (showNavbarItems) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showNavbarItems])

    // CURRENT ERROR: NEED TO MAKE TOGGLEMENUITEMS HANDLE FOR SETSHOWNAVBARITEMS
    const handleNavigation = (e) => {
        // close menu
        setShowMenu(!showMenu)
        setShowNavbarItems(false)
        // navigate to new page
        navigate(e.target.dataset.url)
    }


    return (
        <div className='navbar'>
            <div 
                className="navbar__overlay" 
                style={{display: showNavbarItems ? "block" : "none"}}
                onClick={() => {
                    setShowNavbarItems(false);
                    setShowMenu(false)
                }}
            ></div>
            <div className="navbar__links">
                <div className='navbar__logo' onClick={() => {setShowNavbarItems(false); setShowMenu(false);}}>
                    <Link to='/'>Student App</Link>
                </div>

                <div className={`navbar__menuItems ${showMenu && 'active'}`}>
                    <ul>
                        {menuItems.map((menuItem, key) => {
                            return(
                            <li key={key} onClick={(e) => handleNavigation(e)} data-url={menuItem.url}>
                                {/* <Link to={menuItem.url} onClick={() => setShowMenu(!showMenu)}>{menuItem.label}</Link> */}
                                {menuItem.label}
                            </li>
                            )
                        })}
                    </ul>
                </div>
                <div 
                    className="navbar__hamburger" 
                    onClick={() => {
                        setShowMenu(!showMenu); 
                        setShowNavbarItems(!showNavbarItems);
                    }
                }>=</div>
            </div>
        </div>
    )
}
