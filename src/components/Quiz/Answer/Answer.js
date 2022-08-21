import React from 'react';
import './answer.css';
import { nanoid } from 'nanoid';

export default function Answer(props) {
    console.log(props)

    function generateAnswers(wrongArr, rightAns) {
        const randomIndex = Math.floor(Math.random() * (wrongArr.length + 1));
        wrongArr.splice(randomIndex, 0, rightAns);
        return wrongArr;
    }

    const answersArray = generateAnswers(props.data.incorrect_answers, props.data.correct_answer);
    const radioInputs = answersArray.map(item => {
        return (
            <div className="radio" key={nanoid()}>
                <label>
                    {/* <input
                    type="radio"
                    value={answer}
                    checked={selectedOption === answer}
                    onChange={onValueChange}
                    /> */}
                    {item}
                </label>
            </div>
        )
    }) 


        return (
            <>
                <p>{props.data.question}</p>
                {radioInputs}
            </>
            
        )
    }
