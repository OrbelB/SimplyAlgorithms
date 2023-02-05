import './CommentsPreview.css';
import { useSelector } from 'react-redux';

export default function CommentsPreview() {
  const { dashboardInfo } = useSelector((state) => state.user);

  const displayNotifications =
    dashboardInfo.notifications.length !== 0 ? (
      dashboardInfo?.notifications?.map(
        ({ title, message, notificationId }) => (
          <div key={notificationId} className="preview-sect m-2 mb-5">
            <div className="first-line">
              <h4 className="preview-category">{title}</h4>
            </div>
            <p className="preview-comment">{message}</p>
          </div>
        )
      )
    ) : (
      <div className="preview-sect p-2 m-2 mt-5 mb-5">
        <div className="first-line">
          <h4 className="preview-category">You are up to date</h4>
        </div>
        <p className="preview-comment">No new notifications</p>
      </div>
    );

  return displayNotifications;
}
