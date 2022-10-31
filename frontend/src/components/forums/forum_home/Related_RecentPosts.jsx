import './PostPreview.css'
import { post_previews } from './PostPreview';

export default function Related_RecentPosts() { 
    return (
        <div>
            {post_previews.map(({id, name, title}) => {
            return (
                <div>
                    <div key={id} className="side-section">
                        <div className='line-one'>
                            <img alt="Profile Pic" className="profile-pic"/>
                            <h2 className="side-username">{name}</h2>
                        </div>
                    <h2 className="line-two">{title}</h2>
                    </div>
                </div>
            )
            })}
        </div>
    );
    
}