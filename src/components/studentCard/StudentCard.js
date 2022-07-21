import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import SingleTextInput from '../singleTextInput/SingleTextInput'

import './StudentCard.scss';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';



const StudentCard = ({ student, tags, setTags }) => {

    // props deconstructed
    const { pic, firstname, lastname, email, company, skill, id } = student;

    // hooks
    const [showGrades, setShowGrades] = useState(true);
    const [tagInput, setTagInput] = useState("");
    const [grades, setGrades] = useState([])
    const [gradesLoading, setGradesLoading] = useState(false)
    
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Raleway:wght@900', 'Droid Sans']
            }
        });
    }, []);

    // functions
    const average = (grades) => {
        // let sum = grades.reduce((prev, curr) => {
        //     console.log('prev:', prev)
        //     console.log('curr:', curr)
        //     return Number(prev.grade) + Number(curr.grade)
        // }, 0);
        let sum = 0;
        grades.map((grade) => {
            return sum += Number(grade.grade);
        })
        
        return Math.round(sum / grades.length);
    };

    const hideGrades = (e) => {
        e.preventDefault()
        setShowGrades(!showGrades)
    };
    
    const fetchAndShowGrades = (e) => {
        e.preventDefault()
        
        // Do we already have the grades?
        
        
        if (!grades.length > 0) {
            setGradesLoading(true)

            fetch(`https://student-app-backend-ivan.herokuapp.com/students/${id}/grades`)
            .then(res => res.json())
            .then(data => {
                setGrades(data)
                setGradesLoading(false)
            })
        } else {
            setShowGrades(!showGrades)
        }
    }
    
    useEffect(() => {
        setShowGrades(!showGrades)
    }, [grades]);

    const handleTagInput = (e) => {
        const input = e.target.value
        setTagInput(input)
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
        
    //     const tagsArr = [...tags]
    //     tagsArr.push(tagInput)
    //     setTags(tagsArr)

    //     setTagInput('')
    // }

    // USING TEXT INPUT TO SUBMIT TAGS INSTEAD OF FORM ELEMENT
    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {
            const tagsArr = [...tags]
            tagsArr.push(tagInput)
            setTags(tagsArr)

            setTagInput('')
        }
    }


    return (
        <div className="studentCard">
            <Link to={`/students/${student.id}`} state={{student: student}}>
            <img className="studentCard__pic" src={pic} alt="profile picture" />

            <div className="studentCard__data">
                <div className="studentCard__data__name">
                    {firstname} {lastname}
                </div>

                <div className="studentCard__data__desc">
                    <div className="desc__email">Email: {email}</div>
                    <div className="desc__company">Company: {company}</div>
                    <div>Skill: {skill}</div>
                </div>
                <div className='studentCard__data__gradesList' style={{"display": showGrades ? "block" : "none"}}>
                    <div>Average: {average(grades)}%</div> {/* if grades is empty, show 0%*/}
                    {grades.map((grade, index) => {
                        return (
                            <div key={index}> <span>Test {index + 1}:</span> <span>{grade.grade}%</span> </div>
                        )
                    })}
                </div>
                <div className='studentCard__tagCollection' onClick={(e) => {e.preventDefault()}}>
                    {/* {tags.map((tag, i) => {
                        return (
                            <span className='studentCard__tag' key={i}>{tag}</span>
                            )
                        })
                    } */}
                    {/* <form className='studentCard__tagInput' onSubmit={handleSubmit} > */}
                        <SingleTextInput 
                            handleKeyPress={handleKeyPress}
                            value={tagInput}
                            onChange={handleTagInput}
                            placeHolder={"Add a tag"} 
                            width={"35%"} 
                            border={"2px solid $lighter-gray"}
                            fontSize={"16px"}
                            padding={"12px 0 10px 4px"}
                            margin={"0"}
                            display={'block'}
                        />
                    {/* </form> */}
                </div>
            </div>

            <div className="studentCard__toggleIcons" >
                {/* {!showGrades ? <FaPlus size="1.5em" className="studentCard__toggleIcon" /> : <FaMinus size="1.5em" className="studentCard__toggleIcon" />} */}
                {(gradesLoading) && <AiOutlineReload size="1.8em" className="studentCard__toggleIcon-spinning" />}
                {(!showGrades && !gradesLoading) && <FaPlus size="1.8em" className="studentCard__toggleIcon" onClick={(e) => fetchAndShowGrades(e)}/>}
                {(showGrades && !gradesLoading) && <FaMinus size="1.8em" className="studentCard__toggleIcon" onClick={(e) => hideGrades(e)}/>}
            </div>
            </Link>

        </div>
    );

};

export default StudentCard;