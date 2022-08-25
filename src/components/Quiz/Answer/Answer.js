import React from 'react';
import './answer.css';
import { nanoid } from 'nanoid';

export default function Answer(props) {

    const [selectedOption, setSelectedOption] = React.useState('');

    function onValueChange(e) {
        console.log(e.target.value)
        setSelectedOption(e.target.value);
    };
    // allAnswers: (4) ['Florida', 'California', 'Pennsylvania', 'New%20Jersey']
    // correctAnswer: "Pennsylvania"
    // question: "In%20which%20state%20of%20America%20was%20the%20Fresh%20Prince%20of%2

    console.log(props);
    
    const radioInputs = props.allAnswers.map(answer => {
        return (
            <>
                <input
                    id={answer}
                    type="radio"
                    value={answer}
                    checked={selectedOption === answer}
                    onChange={onValueChange}
                /> 
                <label className="answer__variant" key={nanoid()} htmlFor={answer}>
                    {decodeURIComponent(answer)}
                </label>
            </>
            
        )
    }); 


        return (
            <div className="answer__wrapper">
                <h2 className="question">{decodeURIComponent(props.question)}</h2>
                <div className="answer__variants">{radioInputs}</div>
            </div>
            
        )
    }
