import "./Forum_Quiz.css"
import { NavLink } from "react-router-dom";
export default function Forum() {
    return (
        <div>
            <div className="forum-section">
            <h1 className="head">HAVE A QUESTION?</h1>
            <br/><br/>
            <div className="forum-body">
                <img alt="forum pic" className="pic"/>
                <p className="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Vitae et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id aliquet risus feugiat in ante metus.</p>
            </div>
            <br/><br/>
            <button className="b b1">GO TO FORUMS</button>
            <div className="bottom"></div>
        </div>

        <div className="quiz-section">
            <h1 className="head">TEST YOURSELF</h1>
            <br/><br/>
            <div className="quiz-body">
                <p className="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Vitae et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id aliquet risus feugiat in ante metus.</p>
                <img alt="quiz pic" className="pic"/>
            </div>
            <br/><br/>
            <button className="b b2">
                <NavLink to={"/underconstruction"}>GO TO QUIZZES</NavLink>
            </button>
            <div className="bottom"></div>
        </div>

        </div>
    )
}