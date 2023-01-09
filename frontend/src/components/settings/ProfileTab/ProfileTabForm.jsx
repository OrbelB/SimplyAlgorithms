/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/noPictureTemplate.png';
import { currentUserInfo } from '../../../pages/UserProfilePage';
import { updateUserData } from '../../../services/user';
import useValidateInput from '../../../hooks/use-ValidateInput';
import generateRandomNumber from '../../../utilities/random-index-generator';

export default function ProfileTabForm() {
  const { biography, profilePicture } = useSelector((state) => state.user);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const [images, setImage] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: newBio,
    hasError: newBioInputHasError,
    valueIsValid: newBioIsValid,
    valueChangeHandler: newBioChangedHandler,
    inputBlurHandler: newBioBlurHandler,
    reset: resetNewBioHandler,
  } = useValidateInput((value) => value.trim() !== '', biography);

  let isFormValid = false;
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
          profilePicture:
            images === undefined
              ? profilePicture
              : `https://cdn2.thecatapi.com/images/${generateRandomNumber(
                  1,
                  20
                )}.jpg`,
        },
        accessToken: jwtAccessToken,
      })
    );
    navigate('/userProfile');
    resetNewBioHandler();
  };

  if (newBioIsValid && (images?.name || profilePicture)) isFormValid = true;
  return (
    <div>
      <div>
        <form>
          <div className="card mb-4 mb-xl-0">
            <div className="card-header h5">Profile Picture</div>
            <div className="card-body text-center">
              <img
                src={
                  images === undefined
                    ? profilePicture
                    : URL.createObjectURL(images)
                }
                height="200px"
                width="220px"
                className="rounded-4 m-4"
                alt="profile"
              />
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
            <label htmlFor="bioInput" className=" mt-4 mb-2 h5">
              Biography
            </label>
            <textarea
              className="form-control"
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
            className="btn btn-primary"
            onClick={updateData}
            disabled={!isFormValid}
          >
            Update Profile
          </button>
          <button type="button" className="btn btn-light">
            Reset Changes
          </button>
        </form>
      </div>
    </div>
  );
}
