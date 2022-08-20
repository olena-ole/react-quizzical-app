import './intro.css';

export default function App(props) {
    return (
        <div className="intro">
            <h1 className="intro__title">Quizzical</h1>
            <p className="intro__descr">Choose the right answer!</p>
            <button className="intro__btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}