import { currentUserInfo } from "../../../pages/UserProfilePage";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
export default function TeacherRequestForm(){
    const {username, firstName, lastName, email} = useSelector(state => state.user);

    return (
    <>
    {/* <!-- Button trigger modal --> */}
<div className="okay">
    <h5>Request to be Teacher User
    </h5>
    <p className="text-info">*Note: Request will Personally Reviewed</p>
    <div className="">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#teacherrequest">
            Request Here
        </button>
    </div>
</div>

{/* <!-- Modal --> */}
<div className="modal fade" id="teacherrequest" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">Teacher Request</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
            {currentUserInfo.map(({}) => {
                return(
                    <div>
                        <form>
                            <div className="row">
                                <div className="form-group col">
                                    <label for="trfname">First Name</label>
                                    <input type="text" className="form-control bg-secondary bg-gradient text-white" id="trfname" value={firstName} readonly/>
                                </div>
                                <div className="form-group col">
                                    <label for="trlname">Last Name</label>
                                    <input type="text" className="form-control bg-secondary bg-gradient text-white" id="trlname" value={lastName} readonly/>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label for="trusername">Username</label>
                                <input type="text" className="form-control bg-secondary bg-gradient text-white" id="trusername" value={username} readonly/>
                            </div>
                            <div className="form-group mt-2">
                                <label for="tremail">Email address</label>
                                <input type="email" className="form-control bg-secondary bg-gradient text-white" id="tremail" value={email} readonly/>
                            </div>
                            <div className="form-group mt-2">
                                <label for="trschool">School (if appicable)</label>
                                <input type="search" className="form-control" id="tremail"/>
                            </div>
                            <div className="form-group mt-2">
                                <label for="explainInput">Explaination</label>
                                <textarea className={"form-control"} id="explainInput" rows="5"/>
                            </div>
                            <div className="form-group text-right mt-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
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
