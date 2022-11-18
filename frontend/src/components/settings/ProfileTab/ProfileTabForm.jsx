import image from "../../../assets/noPictureTemplate.png";
import { currentUserInfo } from "../../../pages/UserProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../services/user";
import { useState } from "react";
import useValidateInput from "../../../hooks/use-ValidateInput";
import { useNavigate } from "react-router-dom";

export default function ProfileTabForm() {
  const { biography, profilePicture } = useSelector((state) => state.user);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const [image, setImage] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: newBio,
    hasError: newBioInputHasError,
    valueIsValid: newBioIsValid,
    valueChangeHandler: newBioChangedHandler,
    inputBlurHandler: newBioBlurHandler,
    reset: resetNewBioHandler,
  } = useValidateInput((value) => value.trim() !== "", biography);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateData = () => {
    if (!isFormValid) return;
    dispatch(
      updateUserData({
        updatedUserData: {
          userId: authUserId,
          biography: newBio,
          profilePicture: image === undefined ? "" : image.name,
        },
        accessToken: jwtAccessToken,
      })
    );
    navigate("/userProfile");
    resetNewBioHandler();
  };
  let isFormValid = false;
  if (newBioIsValid && (image?.name || profilePicture)) isFormValid = true;
  return (
    <div>
      <div>
        <form>
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">
              <img
                src={
                  image === undefined
                    ? profilePicture
                    : URL.createObjectURL(image)
                }
                height="200px"
                width="220px"
                className="rounded-4 m-4"
                alt="profile"
              ></img>
              <input
                type="file"
                id="profilePicture"
                className="form-control"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="form-group mt-2 mb-2">
            <label for="bioInput" className="mb-2">
              Biography
            </label>
            <textarea
              className={"form-control"}
              id="bioInput"
              rows="5"
              value={newBio}
              onChange={newBioChangedHandler}
            >
              {newBio}
            </textarea>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            onClick={updateData}
            disabled={!isFormValid}
          >
            Update Profile
          </button>
          <button type="reset" class="btn btn-light">
            Reset Changes
          </button>
        </form>
      </div>
    </div>
  );
}
