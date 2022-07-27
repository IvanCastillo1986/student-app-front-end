import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import SingleTextInput from '../singleTextInput/SingleTextInput'
import EmptyView from '../emptyView/EmptyView'
import DialogBox from '../dialogueBox/DialogBox'

import './StudentCard.scss';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';



const StudentCard = ({ student, tags, setTags }) => {

    // props deconstructed
    const { pic, firstname, lastname, email, company, skill, id } = student;

    // hooks
    const [showGrades, setShowGrades] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [grades, setGrades] = useState([]);
    const [gradesLoading, setGradesLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Raleway:wght@900', 'Droid Sans']
            }
        });
    }, []);

    // functions
    const average = (grades) => {
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
                console.log(data.length)
                setGrades(data)
                setGradesLoading(false)
                setShowGrades(!showGrades)
            })
        } else {
            setShowGrades(!showGrades)
        }
    }
    const showDeleteUserDialog = (e) => {
        e.preventDefault()
        setShowDeleteDialog(true)
    }

    const deleteUser = () => {

        fetch(`https://student-app-backend-ivan.herokuapp.com/students/${id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // redirect to Home Page
            // show toast that user was deleted
        }).catch(err => {
            // show toast that delete was unsuccessful
        })
    }

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
                    {grades.length > 0 &&
                    <>
                    <div>Average: {average(grades)}%</div>
                    {grades.map((grade, index) => {
                        return (
                            <div key={index}> <span>Test {index + 1}:</span> <span>{grade.grade}%</span> </div>
                        )
                    })}
                    </>
                    }
                {grades.length === 0 && <EmptyView text='No grades for this student'/>}
                </div>
                
                {/* <div className='studentCard__tagCollection' onClick={(e) => {e.preventDefault()}}>
                    {tags.map((tag, i) => {
                        return (
                            <span className='studentCard__tag' key={i}>{tag}</span>
                            )
                        })
                    }
                    <form className='studentCard__tagInput' onSubmit={handleSubmit} >
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
                    </form>
                </div> */}
            </div> 
            {/* end .data */}
            <div>
                <div className="studentCard__toggleIcons" >
                        {/* {!showGrades ? <FaPlus size="1.5em" className="studentCard__toggleIcon" /> : <FaMinus size="1.5em" className="studentCard__toggleIcon" />} */}
                        {(gradesLoading) && <AiOutlineReload size="1.8em" className="studentCard__toggleIcon-spinning" />}
                        {(!showGrades && !gradesLoading) && <FaPlus size="1.8em" className="studentCard__toggleIcon" onClick={(e) => fetchAndShowGrades(e)}/>}
                        {(showGrades && !gradesLoading) && <FaMinus size="1.8em" className="studentCard__toggleIcon" onClick={(e) => hideGrades(e)}/>}
                </div>
                <div className="studentCard__toggleDelete" >
                        {(!showGrades && !gradesLoading) && <FaTrash size="1.8em" className="studentCard__toggleIcon" onClick={(e) => showDeleteUserDialog(e)}/>}
                </div>
            </div>
            </Link>
            <DialogBox open={showDeleteDialog} setOpen={setShowDeleteDialog} deleteUser={deleteUser} />
        </div>
    );

};

export default StudentCard;