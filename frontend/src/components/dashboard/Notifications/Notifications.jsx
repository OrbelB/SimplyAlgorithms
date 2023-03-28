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
    </>
  );
}
