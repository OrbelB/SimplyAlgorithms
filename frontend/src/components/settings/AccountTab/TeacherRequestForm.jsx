import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestRoleChange } from '../../../services/user';
import AlertSnackBar from '../../alert-messages-snackbar/AlertSnackBar';

export default function TeacherRequestForm() {
  const { userId, username, firstName, lastName, email, status } = useSelector(
    (state) => state.user
  );
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [school, setSchool] = useState('');
  const [reasoning, setReasoning] = useState('');

  const [requestSubmitted, setRequestSubmitted] = useState(false);

  useEffect(() => {
    if (requestSubmitted && status === 'success') {
      setSchool('');
      setReasoning('');
    }
  }, [requestSubmitted, status]);

  const handleSubmitRoleChangeForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const roleRequestForm = {
      userId,
      username,
      role: 'TEACHER',
      school,
      reasoning,
    };
    try {
      await dispatch(
        requestRoleChange({ roleRequestForm, jwtAccessToken })
      ).unwrap();
    } finally {
      setRequestSubmitted(true);
    }
  };

  const alertSnackBarType = useMemo(() => {
    if (requestSubmitted && status === 'success')
      return (
        <AlertSnackBar
          passedMessage="Your request hass been succesfully submitted!"
          typeMessage="success"
          removeData={() => setRequestSubmitted(false)}
        />
      );
    if (requestSubmitted && status === 'failed')
      return (
        <AlertSnackBar
          passedMessage="Something went wrong with your request try again later!"
          typeMessage="error"
          removeData={() => setRequestSubmitted(false)}
        />
      );
    return null;
  }, [status, requestSubmitted]);
  return (
    <>
      {alertSnackBarType}
      {/* <!-- Button trigger modal --> */}
      <div className="okay">
        <h5>Request to be Teacher User</h5>
        <p className="text-info">*Note: Request will Personally Reviewed</p>
        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#teacherrequest"
          >
            Request Here
          </button>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="teacherrequest"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Teacher Request
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="trfname">
                    First Name
                    <input
                      type="text"
                      className="form-control bg-secondary bg-gradient text-white"
                      id="trfname"
                      value={firstName}
                      readOnly
                    />
                  </label>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="trlname">
                    Last Name
                    <input
                      type="text"
                      className="form-control bg-secondary bg-gradient text-white"
                      id="trlname"
                      value={lastName}
                      readOnly
                    />
                  </label>
                </div>
              </div>
              <div className="form-group mt-2 row">
                <div className="col-6">
                  <label htmlFor="trusername">
                    Username
                    <input
                      type="text"
                      className="form-control bg-secondary bg-gradient text-white"
                      id="trusername"
                      value={username}
                      readOnly
                    />
                  </label>
                </div>
                <div className="col-6">
                  <label htmlFor="tremail">
                    Email address
                    <input
                      type="email"
                      className="form-control bg-secondary bg-gradient text-white"
                      id="tremail"
                      value={email}
                      readOnly
                    />
                  </label>
                </div>
              </div>
              <div className="form-group mt-2 row">
                <label htmlFor="trschool">
                  School (if applicable)
                  <input
                    type="search"
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                    className="form-control"
                    id="tremail"
                  />
                </label>
              </div>
              <div className="form-group mt-2 row">
                <label htmlFor="explainInput">
                  Explanation
                  <textarea
                    onChange={(e) => setReasoning(e.target.value)}
                    value={reasoning}
                    className="form-control"
                    id="explainInput"
                    rows="5"
                  />
                </label>
              </div>
              <div className="form-group d-flex justify-content-end-100 mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'pending'}
                  onClick={handleSubmitRoleChangeForm}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
