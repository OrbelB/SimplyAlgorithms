import image from "../../../assets/noPictureTemplate.png";
import { currentUserInfo } from "../../../pages/UserProfilePage";
export default function ProfileTabForm(){
    return (
        <div>
            {currentUserInfo.map(({bio}) => {
              return (
                <div>
                    <form>
                        <div class="card mb-4 mb-xl-0">
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                <img src={image} height="200px" width="225px"className="rounded-circle"></img>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/jpg"
                                />
                            </div>
                        </div>
                        <div className="form-group mt-2mb-2">
                            <label for="bioInput" className="mb-2">Biography</label>
                            <textarea className={"form-control"} id="bioInput" rows="5">{bio}</textarea>
                        </div>
                        <button type="button" class="btn btn-primary">Update Profile</button>
                        <button type="reset" class="btn btn-light">Reset Changes</button>
                    </form>
                </div>
              );
            })}
        </div>
    );
}