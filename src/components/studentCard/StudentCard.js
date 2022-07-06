import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import './StudentCard.scss';


const StudentCard = ({ student }) => {

    const { pic, firstName, lastName, email, company, skill, grades } = student;

    const average = (grades) => {
        let sum = grades.reduce((prev, curr) => Number(prev) + Number(curr), 0);

        return sum / grades.length;
    };

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Raleway:wght@900', 'Droid Sans']
            }
        });
    }, []);


    return (
        <div className="studentCard">
            <div className='picDiv'>
                <img className="pic" src={pic} alt="profile picture" />
            </div>

            <div className="data">
                <div className="name">
                    {firstName} {lastName}
                </div>
                <div className="desc">
                    <div className="desc__email">Email: {email}</div>
                    <div className="desc__company">Company: {company}</div>
                    <div>Skill: {skill}</div>
                    <div>Average: {average(grades)}%</div>
                </div>
            </div>
        </div>
    );

};

export default StudentCard;