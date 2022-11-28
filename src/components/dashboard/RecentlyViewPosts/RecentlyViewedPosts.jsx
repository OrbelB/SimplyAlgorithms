import { post_previews_withnorating } from "./PostPreview_noratings";
export default function RecentlyViewedPosts(){
    return(
        <div>
            {post_previews_withnorating.map(({id, name, title}) => {
            return (
                <div>
                    <div key={id} className="side-sect">
                        <div className='line-one'>
                            <img alt="Profile Pic" className="profile-pic"/>
                            <h4 className="side-username">{name}</h4>
                        </div>
                    <h5 className="line-two">{title}</h5>
                    </div>
                </div>
            )
            })}
        </div>
    );
}