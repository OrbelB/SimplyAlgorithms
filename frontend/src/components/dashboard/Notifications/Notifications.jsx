import './Notifications.css';
import { Modal } from 'react-bootstrap';
import NotificationsPreview from './NotificationsPreview/NotifcationsPreview';

export default function Notifications({ show, setShow }) {
  return (
    <>
      {/* <!-- Modal --> */}
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton className="btr text-center">
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body className="btr">
          <div className="secondline">
            <NotificationsPreview setShow={setShow} />
          </div>
        </Modal.Body>
      </Modal>
      {/* <div
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
      </div> */}
    </>
  );
}
