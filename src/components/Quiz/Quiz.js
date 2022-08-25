import React from 'react';
import './quiz.css';
import Answer from './Answer/Answer';
import { nanoid } from 'nanoid';

// props.data = { 
//     category: "Entertainment: Comics",
//     correct_answer: "Mr. Spittle",
//     difficulty: "medium",
//     incorrect_answers: ["Mr. Boreman", "Mr. Spitling", "Mr. Moe"],
//     question: "In Calvin and Hobbes, what is the name of the principal at Calvin&#039;s school?",
//     type: "multiple"
// }

export default function Quiz() {

    const [data, setData] = React.useState([]);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    React.useEffect( () => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986')
            .then(res => res.json())
            .then(data => setData(data.results));
    }, []);

    function generateAnswers(wrongArr, rightAns) {
        const randomIndex = Math.floor(Math.random() * (wrongArr.length + 1));
        const allAnswers = [...wrongArr];
        allAnswers.splice(randomIndex, 0, rightAns);
        return allAnswers;
    }

    function showResults() {
        setIsSubmitted(true);
    };

    const questionEls = data.map(item => {
        return (
            <Answer 
                correctAnswer={item.correct_answer}
                question={item.question}
                key={nanoid()} 
                allAnswers={generateAnswers(item.incorrect_answers, item.correct_answer)}
            />
        );
    });

    return (
        <div className="quiz">
            {questionEls}
            {isSubmitted ? 
                <div className="quiz__results">
                    <p className="quiz__score">You scored 3/5 correct answers</p>
                    <button className="btn">Play again</button>
                </div> : 
                <button className="btn submit__btn" onClick={showResults}>Check answers</button>
            }
        </div>
    );
};