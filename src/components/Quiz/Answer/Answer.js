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
            <div className="radio" key={nanoid()}>
                <label>
                    <input
                    type="radio"
                    value={answer}
                    checked={selectedOption === answer}
                    onChange={onValueChange}
                    /> 
                    {decodeURIComponent(answer)}
                </label>
            </div>
        )
    }); 


        return (
            <>
                <p>{decodeURIComponent(props.question)}</p>
                {radioInputs}
            </>
            
        )
    }
