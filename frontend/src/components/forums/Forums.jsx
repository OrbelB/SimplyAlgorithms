import './Forums.css'

export default function Forums() {
    return (
    <div className="forums-section">
        <h1 className="forum-title">FORUMS</h1>
        <div className="row">
            <div className="column side">
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
            <div className="column middle">
                <div className='new-post'>
                    <br/>
                    <input type="text" className="post-bar" placeholder="Create Post"/>
                </div>
                <br/><br/>
                <button className='filter-button first-filter'>Top Rated</button>
                <button className='filter-button'>New</button>
                <button className='filter-button'>Alphabetically</button>
                <button className='filter-button'>Other</button>
                <button className='filter-button last-filter'>Other</button>
                <br/><br/><br/><br/>
                <div className='posts'>
                </div>
            </div>
            <div className="column side">
                <h1 className="category-label">Recently Viewed Posts</h1>
                <div className="recent-posts">

                </div>
                <h1 className="category-label">Related Posts</h1>
                <div className="related-posts">

                </div>
            </div>
        </div>
    </div>
    )
}