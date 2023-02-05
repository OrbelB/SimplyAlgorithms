import './Notifications.css';
import { useSelector } from 'react-redux';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';

export default function Notifications() {
  const { dashboardInfo } = useSelector((state) => state.user);
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className="">
        <button
          type="button"
          className="bts btn"
          data-bs-toggle="modal"
          data-bs-target="#notificationdb"
        >
          <h5>
            Notifications
            <span className="badge">
              {dashboardInfo?.notifications?.length}
            </span>
          </h5>
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="notificationdb"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content btr">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Notifications
              </h2>
              <button
                type="button"
                className="btn-close"
                name="modal-notification-close"
                id="modal-notification-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="secondline">
                <NotificationsPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
