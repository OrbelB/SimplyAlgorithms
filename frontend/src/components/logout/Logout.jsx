import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../../store/reducers/auth-reducer";
import { userActions } from "../../store/reducers/user-reducer";
import { useState } from "react";
export default function Logout({ handleLogout }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClose = () => {
    handleLogout(!showModal);
  };
  const handleUserLogoutRequest = () => {
    dispatch(authActions.resetData({}));
    dispatch(userActions.onUserLogout({}));
    handleLogout(!showModal);
    navigate(location, {
      replace: true,
    });
  };
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={"text-center"} closeButton>
        <Modal.Title
          id={"contained-modal-title-vcenter"}
          className="text-center w-100"
        >
          <h2 className="text-uppercase text-center">Logout</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={"text-center"}>
        <h4>Are you sure you want to logout?</h4>
      </Modal.Body>
      <Modal.Footer className=" justify-content-evenly">
        <div className="col-4">
          <button className="btn btn-danger" onClick={handleUserLogoutRequest}>
            YES
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-light" type="button" onClick={handleClose}>
            NO
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
