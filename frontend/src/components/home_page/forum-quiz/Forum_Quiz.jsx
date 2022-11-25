import "./Forum_Quiz.css"
import image from "../../../assets/forums-icon.png";
import { NavLink } from "react-router-dom";
export default function Forum() {
    return (
        <div>
            <div className="forum-section">
            <h1 className="head">HAVE A QUESTION?</h1>
            <br/><br/>
            <div className="forum-body">
                <img src={image}  alt="forum pic" className="pic"/>
                <p className="body">Use our forums to have discussions with users about different topics. Find the precise topic you're looking for in the Category List, then browse the numerous posts that other users have written on it.
                 You might wish to write a post and look into the topic at the same time. There are numerous topics to discuss, so begin a discussion now!</p>
            </div>
            <br/><br/>
            <button className="b b1">
                <NavLink to={"/forums"}>GO TO FORUMS</NavLink>
            </button>
            <div className="bottom"></div>
        </div>

        {/*<div className="quiz-section">
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
    </div>*/
    }

        </div>
    )
}