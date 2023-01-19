import React, { useState } from 'react';

export default function ConfirmPopup({
  messageHeader,
  messageBody,
  messageFooter,
  showMessage,
}) {
  const [setShow] = useState(showMessage);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // eslint-disable-next-line prettier/prettier
  console.log("ASDASD");
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {messageHeader}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{messageBody}</div>
          <div className="modal-footer">
            <p>{messageFooter}</p>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
