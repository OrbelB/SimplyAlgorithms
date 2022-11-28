import './PostPreview_noratings.css'

const post_previews_withnorating = [
  {id: 1, name: 'Bob', title: "Lorem ipsum dolor sit amet, duo dolore erroribus ut?"},
  {id: 2, name: 'Jimmy', title: "An atqui vocent est, an dicunt iuvaret comprehensam eam?"},
  {id: 3, name: 'Steve', title: "Quo no quot virtute, te est paulo civibus facilisi, melius hendrerit has at?"}
];

export { post_previews_withnorating }

export default function PostPreview() {
    return (
      <div>
        {post_previews_withnorating.map(({id, name, title}) => {
          return (
            <div>
                <div key={id} className="preview-sect">
                    <div className='first-line'>
                        <img alt="Profile Pic" className="profile-pic"/>
                        <h4 className="preview-username">{name}</h4>
                    </div>
                <h5 className="preview-title">{title}</h5>
                </div>
            <br/><br/>
            </div>
          );
        })}
      </div>
    );
  }
  