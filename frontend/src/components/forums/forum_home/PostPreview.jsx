import './PostPreview.css'
import Vote from '../../vote_comp/Vote.jsx';
import Report from '../report/Report';

const post_previews = [
  {id: 1, name: 'Bob', title: "Lorem ipsum dolor sit amet, duo dolore erroribus ut?"},
  {id: 2, name: 'Jimmy', title: "An atqui vocent est, an dicunt iuvaret comprehensam eam?"},
  {id: 3, name: 'Steve', title: "Quo no quot virtute, te est paulo civibus facilisi, melius hendrerit has at?"},
  {id: 4, name: 'SuperLongUsername', title:  "An sit purto melius recusabo. Vocibus delectus vim at, eros viderer referrentur et has?"},
  {id: 5, name: 'Your Mom', title: "An epicurei rationibus vituperata mei, ea odio veri reque nec."},
];

export { post_previews }

export default function PostPreview() {
    return (
      <div>
        {post_previews.map(({id, name, title}) => {
          return (
            <div>
                <div key={id} className="preview-section">
                    <div className='first-line'>
                        <img alt="Profile" className="profile-pic"/>
                        <h2 className="preview-username">{name}</h2>
                    </div>
                <h2 className="preview-title">{title}</h2>
                    <div className="third-line">  
                      <div className="left-side">  
                        <Vote/>
                      </div>
                      <div className="right-side">
                        <Report/>
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
  