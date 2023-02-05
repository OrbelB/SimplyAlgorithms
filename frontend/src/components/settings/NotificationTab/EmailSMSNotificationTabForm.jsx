/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePreferences } from '../../../services/user';

export default function EmailSMSNotificationTabForm() {
  const { email, userPreferences } = useSelector((state) => state.user);
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const [accountChanges, setAccountChanges] = useState(
    userPreferences.accountChanges
  );
  const [postReplies, setPostReplies] = useState(userPreferences.postReplies);
  const [repliesNotification, setRepliesNotification] = useState(
    userPreferences.repliesNotification
  );
  const [specialUpdates, setSpecialUpdates] = useState(
    userPreferences.specialUpdates
  );
  const dispatch = useDispatch();
  function submitUpdatePreferences(event) {
    event.preventDefault();
    dispatch(
      updatePreferences({
        updatedPreferences: {
          userId: authUserId,
          accountChanges,
          postReplies,
          repliesNotification,
          specialUpdates,
        },
        accessToken: jwtAccessToken,
      })
    );
  }
  return (
    <div>
      <div>
        <form onSubmit={(event) => submitUpdatePreferences(event)}>
          <label className="d-block h5">Email Notifications</label>
          <div className="mb-1">
            <strong
              className="text-secondary mb-1"
              htmlFor="inputNotificationEmail"
            >
              Default notification email
            </strong>
            <input
              className="form-control bg-secondary bg-gradient text-white"
              id="inputNotificationEmail"
              type="email"
              value={email}
              readOnly
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={userPreferences.accountChanges}
                onChange={(e) => setAccountChanges(e.target.checked)}
                id="AccountChangeEmail"
              />
              <label
                className="form-check-label h6"
                htmlFor="AccountChangeEmail"
              >
                Account Changes
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={userPreferences.postReplies}
                onChange={(e) => setPostReplies(e.target.checked)}
                id="PostRepliesEmail"
              />
              <label className="form-check-label h6" htmlFor="PostRepliesEmail">
                Post updates
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={userPreferences.repliesNotification}
                onChange={(e) => setRepliesNotification(e.target.checked)}
                id="PostLikesEmail"
              />
              <label className="form-check-label h6" htmlFor="PostLikesEmail">
                Forum Updates
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="SpecialUpdatesEmail"
                onChange={(e) => setSpecialUpdates(e.target.checked)}
                defaultChecked={userPreferences.specialUpdates}
              />
              <label
                className="form-check-label h6"
                htmlFor="SpecialUpdatesEmail"
              >
                Special Updates
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
