import './Notifications.css';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';

export default function Notifications() {
  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <div className="text-center m-2">
        <button
          type="button"
          className="bts"
          data-bs-toggle="modal"
          data-bs-target="#backdrop3"
        >
          <h5>
            Notifications
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </h5>
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="backdrop3"
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
