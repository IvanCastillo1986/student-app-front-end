import React from 'react'
import "./Contact.scss"
import { FaCheck } from 'react-icons/fa'



export default function Contact() {



    return (
        <div className='contact'>
            <div className='contact__info'>
                <div className='contact__title'>Contact Jordan Manley</div>
                <div className='contact__subheader'>
                    Like what you see? I'm a graduate of Pursuit looking for my first full-time job.
                </div>

                <div className='contact__salesPoints'>
                    <div className='contact__salesPoint'>
                        <div className='contact__salesPointIcon'>
                            <FaCheck />
                        </div>
                        <div className='contact__salesPointText'>
                            This project was created by me to show my love of robot learners.
                            Message me if you could talk neuroscience for hours.
                        </div>
                    </div>
                    <div className='contact__salesPoint'>
                        <div className='contact__salesPointIcon'>
                            <FaCheck />
                        </div>
                        <div className='contact__salesPointText'>
                            If you are looking for a strong developer, reach out to me.
                        </div>
                    </div>
                    <div className='contact__salesPoint'>
                        <div className='contact__salesPointIcon'>
                            <FaCheck />
                        </div>
                        <div className='contact__salesPointText'>
                        I was the strongest guy in the gym, for a whole month at one point. 
                        And then the strongest dude healed up from his injury and came back!
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact__form'>
                Contact Form
            </div>
        </div>
    )
}
