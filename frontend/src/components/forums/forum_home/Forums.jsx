import './Forums.css'
import PostPreview from './PostPreview'
import Post from '../post/Post'
import Related_RecentPosts from './Related_RecentPosts'


export default function Forums() {
    return (
    <div className="forums-section">
        <h1 className="forum-title">FORUMS</h1>
        <div className="row">
            <div className="column">
                <div className="side1">
                    <h1 className="category-label">Categories</h1>
                    <input type="text" className="search-bar" placeholder="Search Category..."/>
                    <div className="btn-group">
                        <button className='category' >Sorting</button>
                        <button className='category'>Searching</button>
                        <button className='category'>Graphs</button>
                        <button className='category'>Trees</button>
                        <button className='category'>Arrays</button>
                        <button className='category'>Linked List</button>
                        <button className="last-button">Explore More...</button>
                    </div>
                </div>
                <div className="middle">
                    <button className='filter-button first-filter'>Top Rated</button>
                    <button className='filter-button'>New</button>
                    <button className='filter-button'>Alphabetical</button>
                    <button className='filter-button last-filter'>Other</button>
                    <br/><br/>
                    <Post/>
                    <br/><br/>
                    <PostPreview/>
                </div>
                <div className="side2">
                    <div className="recent-posts">
                        <h1 className="category-label">Recently Viewed Posts</h1>
                        <Related_RecentPosts/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}