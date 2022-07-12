import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import './StudentCard.scss';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';



const StudentCard = ({ student }) => {

    // props deconstructed
    const { pic, firstName, lastName, email, company, skill, grades } = student;

    // hooks
    const [showGrades, setShowGrades] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState([])
    
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Raleway:wght@900', 'Droid Sans']
            }
        });
    }, []);

    // functions
    const average = (grades) => {
        let sum = grades.reduce((prev, curr) => Number(prev) + Number(curr), 0);
        
        return sum / grades.length;
    };

    const toggleGrades = (e) => {
        e.preventDefault()
        setShowGrades(!showGrades)
    }

    const handleTagsInput = (e) => {
        const input = e.target.value
        setTagInput(input)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const tagsArr = [...tags]
        tagsArr.push(tagInput)
        setTags(tagsArr)

        setTagInput('')
    }


    return (
        <div className="studentCard">
            <Link to={`/students/${student.id}`} state={{student: student}}>
            <img className="studentCard__pic" src={pic} alt="profile picture" />

            <div className="studentCard__data">
                <div className="studentCard__data__name">
                    {firstName} {lastName}
                </div>

                <div className="studentCard__data__desc">
                    <div className="desc__email">Email: {email}</div>
                    <div className="desc__company">Company: {company}</div>
                    <div>Skill: {skill}</div>
                    <div>Average: {average(grades)}%</div>
                </div>
                <div className='studentCard__data__gradesList' style={{"display": showGrades ? "block" : "none"}}>
                    {grades.map((grade, index) => {
                        return (
                            <div key={index}> <span>Test {index + 1}:</span> <span>{grade}%</span> </div>
                        )
                    })}
                </div>
            </div>

            <div className="studentCard__toggleIcons" >
                {/* {!showGrades ? <FaPlus size="1.5em" className="studentCard__toggleIcon" /> : <FaMinus size="1.5em" className="studentCard__toggleIcon" />} */}
                {!showGrades && <FaPlus size="1.5em" className="studentCard__toggleIcon" onClick={(e) => toggleGrades(e)}/>}
                {showGrades && <FaMinus size="1.5em" className="studentCard__toggleIcon" onClick={(e) => toggleGrades(e)}/>}
            </div>
            </Link>

            <div className='studentCard__tagsCollection'>
                {tags.map((tag, i) => {
                    return (
                        <span key={i}>{tag}</span>
                    )
                })}
            </div>
            <form className='studentCard__tagsInput' onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    value={tagInput} 
                    onChange={handleTagsInput}
                    placeholder="Add a tag" 
                />
            </form>
        </div>
    );

};

export default StudentCard;