import './PostPreview.css'
import {FaThumbsUp} from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import {GoReport} from 'react-icons/go';


export default function PostPreview() {
    const post_previews = [
      {id: 1, name: 'Bob', title: "I'm totally lost"},
      {id: 2, name: 'Jimmy', title: "How do I do this?"},
      {id: 3, name: 'Steve', title: "Why does this happen when I do this?"},
      {id: 4, name: 'SuperLongUsername', title:  "Where can I find more info?"},
      {id: 5, name: 'Your Mom', title: "Can someone explain this to me?"},
    ];
  
    return (
      <div>
        {post_previews.map(({id, name, title}) => {
          return (
            <div>
                <div key={id} className="preview-section">
                    <div className='first-line'>
                        <img alt="Profile Pic" className="profile-pic"/>
                        <h2 className="preview-username">{name}</h2>
                    </div>
                <h2 className="preview-title">{title}</h2>
                    <div className="third-line">  
                      <div className="left-side">  
                        <FaThumbsUp className="thumbsUp"/>
                        |
                        <FaThumbsDown className="thumbsDown"/>
                      </div>
                      <div className="right-side">
                        <GoReport className="report"/>
                        Report
                      </div>
                    </div>
                </div>
            <br/><br/>
            </div>
          );
        })}
      </div>
    );
  }
  