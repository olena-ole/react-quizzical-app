import React from 'react';
import './quiz.css';
import { nanoid } from 'nanoid';

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
        setRightAnswersCount(0);
        setIsSubmitted(false);
        props.newGame();
    }

    const questionEls = props.data.map((item, i) => {

        const radioInputs = item.allAnswers.map(answer => {

            const styles = {
                background: isSubmitted 
                            ? 
                            answer === item.correctAnswer ? '#94D7A2' : 
                                selectedOptions[i] === answer && selectedOptions[i] !== item.correctAnswer ? '#F8BCBC' : 'transparent'
                            :
                            selectedOptions[i] === answer ? '#D6DBF5' : 'transparent',
                border: isSubmitted
                        ?
                        answer === item.correctAnswer || (selectedOptions[i] === answer && selectedOptions[i] !== item.correctAnswer) ? 'none' : '1px solid #4D5B9E'
                        :
                        selectedOptions[i] === answer ? 'none' : '1px solid #4D5B9E'
            };

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
                    <label className="answer__variant"  
                        htmlFor={answer}
                        style={styles}>
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