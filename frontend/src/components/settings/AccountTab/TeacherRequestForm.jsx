import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUserInfo } from '../../../pages/UserProfilePage';

export default function TeacherRequestForm() {
  const { username, firstName, lastName, email } = useSelector(
    (state) => state.user
  );

  return (
    <>
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
              <div>
                {currentUserInfo.map(({}) => {
                  return (
                    <div>
                      <form>
                        <div className="row">
                          <div className="form-group col">
                            <label htmlFor="trfname">First Name</label>
                            <input
                              type="text"
                              className="form-control bg-secondary bg-gradient text-white"
                              id="trfname"
                              value={firstName}
                              readOnly
                            />
                          </div>
                          <div className="form-group col">
                            <label htmlFor="trlname">Last Name</label>
                            <input
                              type="text"
                              className="form-control bg-secondary bg-gradient text-white"
                              id="trlname"
                              value={lastName}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="trusername">Username</label>
                          <input
                            type="text"
                            className="form-control bg-secondary bg-gradient text-white"
                            id="trusername"
                            value={username}
                            readOnly
                          />
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="tremail">Email address</label>
                          <input
                            type="email"
                            className="form-control bg-secondary bg-gradient text-white"
                            id="tremail"
                            value={email}
                            readOnly
                          />
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="trschool">
                            School (if appicable)
                          </label>
                          <input
                            type="search"
                            className="form-control"
                            id="tremail"
                          />
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="explainInput">Explaination</label>
                          <textarea
                            className="form-control"
                            id="explainInput"
                            rows="5"
                          />
                        </div>
                        <div className="form-group text-right mt-2">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
