import React from 'react';
import './quiz.css';
import Answer from './Answer/Answer';
import { nanoid } from 'nanoid';

// const obj = { 
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
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => {
                setData(data.results)
            });
    }, []);

    const questionEls = data.map(item => <Answer data={item} key={nanoid()} />)

    return (
        <form className="quiz">
            {questionEls}
            <button className="submit__btn">Check answers</button>
        </form>
    );
};