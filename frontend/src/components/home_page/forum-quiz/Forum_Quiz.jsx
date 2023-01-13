import './Forum_Quiz.css';
import { NavLink } from 'react-router-dom';
import image from '../../../assets/forums-icon.png';

export default function Forum() {
  return (
    <div>
      <div className="forum-section">
        <h1 className="head">HAVE A QUESTION?</h1>
        <br />
        <br />
        <div className="forum-body">
          <img src={image} alt="forum pic" className="pic" />
          <p className="body">
            Use our forums to have discussions with users about different
            topics. Find the precise topic you are looking for in the Category
            List, then browse the numerous posts that other users have written
            on it. You might wish to write a post and look into the topic at the
            same time. There are numerous topics to discuss, so begin a
            discussion now!
          </p>
        </div>
        <br />
        <br />
        <form>
          <button type="button" className="b b1">
            <NavLink to="/forums">
              <p className="fbtext">GO TO FORUMS</p>
            </NavLink>
          </button>
        </form>
      </div>
    </div>
  );
}
