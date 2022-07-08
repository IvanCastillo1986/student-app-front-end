import React, { useEffect, useState, useRef } from 'react';
import WebFont from 'webfontloader';
import './StudentCard.scss';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';


const StudentCard = ({ student }) => {

    // props deconstructed
    const { pic, firstName, lastName, email, company, skill, grades } = student;

    // hooks
    const [showGrades, setShowGrades] = useState(false)
    
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Raleway:wght@900', 'Droid Sans']
            }
        });
    }, []);
    
    const average = (grades) => {
        let sum = grades.reduce((prev, curr) => Number(prev) + Number(curr), 0);
        
        return sum / grades.length;
    };

    function toggleIcons() {
        setShowGrades(!showGrades)
    }


    return (
        <div className="studentCard">
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

            <div className="studentCard__toggleIcons" onClick={toggleIcons}>
                {!showGrades ? <FaPlus size="1.5em" className="studentCard__toggleIcon" /> : <FaMinus size="1.5em" className="studentCard__toggleIcon" />}
                {/* {!showGrades && <FaPlus size="1.5em" className="studentCard__toggleIcon" />} */}
                {/* {showGrades && <FaMinus size="1.5em" className="studentCard__toggleIcon" />} */}
            </div>
        </div>
    );

};

export default StudentCard;