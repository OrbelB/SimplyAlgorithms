import './NotificationsPreview.css'

const notification_previews = [
  {id: 1, department: 'Maintenance', message: "Simply Algorithim scheduled maintenance on December 11, 2022 12:00pm - 4:00pm."},
  {id: 2, department: 'Forum', message: "You have gotten (23) replies to your post: An epicurei rationibus vituperata mei, ea odio veri reque nec."},
  {id: 3, department: 'Simply Algorithims', message: "We noticed that you enjoyed studying about Searching algorithms. You might be intrigued by learning about Arrays."}
];

export { notification_previews }

export default function NotificationsPreview() {
    return (
      <div>
        {notification_previews.map(({id, department,message}) => {
          return (
            <div>
                <div key={id} className="preview-sect">
                    <div className='first-line'>
                        <img alt="Profile Pic" className="profile-pic"/>
                        <h4 className="preview-department">{department}</h4>
                    </div>
                <p className="preview-message">{message}</p>
                </div>
            <br/><br/>
            </div>
          );
        })}
      </div>
    );
  }
  