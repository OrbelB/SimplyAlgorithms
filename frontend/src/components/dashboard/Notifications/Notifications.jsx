import './Notifications.css';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';

const notif = [
  {
    num: '4',
  },
];
export default function Notifications() {
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
          {notif.map(({ index, num }) => (
            <h5 key={index}>
              Notificaitons
              <span className="badge">{num}</span>
            </h5>
          ))}
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
