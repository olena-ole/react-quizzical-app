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

    let [data, setData] = React.useState([]);
    React.useEffect( () => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986')
            .then(res => res.json())
            .then(data => setData(data.results))
    }, []);

    function generateAnswers(wrongArr, rightAns) {
        const randomIndex = Math.floor(Math.random() * (wrongArr.length + 1));
        const allAnswers = [...wrongArr];
        allAnswers.splice(randomIndex, 0, rightAns);
        return allAnswers;
    }

    const questionEls = data.map(item => <Answer 
                                            correctAnswer={item.correct_answer}
                                            question={item.question}
                                            key={nanoid()} 
                                            allAnswers={generateAnswers(item.incorrect_answers, item.correct_answer)}
                                        />);

    return (
        <form className="quiz">
            {questionEls}
            <button className="submit__btn" >Check answers</button>
        </form>
    );
};