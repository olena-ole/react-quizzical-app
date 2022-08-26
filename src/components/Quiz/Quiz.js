import React from 'react';
import './quiz.css';
import { nanoid } from 'nanoid';

// allAnswers: (4) ['Florida', 'California', 'Pennsylvania', 'New%20Jersey']
// correctAnswer: "Pennsylvania"
// question: "In%20which%20state%20of%20America%20was%20the%20Fresh%20Prince%20of%2
// selectedOption: ""

export default function Quiz(props) {

    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState(props.data.map(item => item.selectedOption));
    const [rightAnswersCount, setRightAnswersCount] = React.useState(0);

    function showResults(e) {
        e.preventDefault();
        const rightAnswers = selectedOptions.filter((option, i) => option === props.data[i].correctAnswer).length;
        setRightAnswersCount(rightAnswers);
        setIsSubmitted(true);
    };

    function onValueChange(e, i) {
        console.log(e.target.value);
        setSelectedOptions(prev => {
            return prev.map((option, index) => {
                if (i === index) {
                    return e.target.value;
                } else {
                    return option;
                }
            })
        });
    };

    function startNewGame() {
        props.newGame();
        setIsSubmitted(false);
        setRightAnswersCount(0);
    }

    const questionEls = props.data.map((item, i) => {

        const radioInputs = item.allAnswers.map(answer => {
            return (
                <div key={nanoid()} className="answer__variant__wrapper">
                    <input
                        disabled={isSubmitted ? true : false}
                        id={answer}
                        type="radio"
                        value={answer}
                        checked={selectedOptions[i] === answer}
                        onChange={(e) => onValueChange(e, i)}
                    /> 
                    <label className="answer__variant"  htmlFor={answer}>
                        {decodeURIComponent(answer)}
                    </label>
                </div>
                
            )
        });

        return (
            <div className="answer__wrapper" key={nanoid()}>
                <h2 className="question">{decodeURIComponent(item.question)}</h2>
                <div className="answer__variants">{radioInputs}</div>
            </div>    
        );
    });

    return (
        <div className="quiz">
            {questionEls}
            {isSubmitted ? 
                <div className="quiz__results">
                    <p className="quiz__score">You scored {rightAnswersCount}/5 correct answers</p>
                    <button className="btn" onClick={startNewGame}>Play again</button>
                </div> : 
                <button className="btn submit__btn" onClick={showResults}>Check answers</button>
            }
        </div>
    );
};