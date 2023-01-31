/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSelector } from 'react-redux';

export default function EmailSMSNotificationTabForm() {
  const { email } = useSelector((state) => state.user);
  return (
    <div>
      <div>
        <form>
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
                id="PostRepliesEmail"
              />
              <label className="form-check-label h6" htmlFor="PostRepliesEmail">
                Post Replies
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="PostLikesEmail"
              />
              <label className="form-check-label h6" htmlFor="PostLikesEmail">
                Post Likes
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="SpecialUpdatesEmail"
              />
              <label
                className="form-check-label h6"
                htmlFor="SpecialUpdatesEmail"
              >
                Special Updates
              </label>
            </div>
          </div>
          <button type="button" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
