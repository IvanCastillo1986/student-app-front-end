import React from 'react'

import './SearchBar.scss'



export default function SearchBar({ searchTerm, handleSearch }) {


    return (
        <div className='searchBarDiv'>
            <input 
                className='searchBarDiv__searchBar' 
                value={searchTerm} 
                onChange={handleSearch} 
                type="search" 
                placeholder="Search by name" 
            />
        </div>
    )
}
