import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

export default function Profile() {
  const { username, email, profilePicture, role, biography, createdDate } =
    useSelector((state) => state.user);
  return (
    <div>
      <div className="container mt-2">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card border-white p-3 py-4">
              <div className="text-center">
                <img
                  src={profilePicture}
                  height="125px"
                  width="150px"
                  className="rounded-2"
                  alt="profile"
                />
              </div>
              <div className="text-center mt-3">
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  {role}
                </span>
                <h5 className="mt-2 mb-0">{username}</h5>
                <span>{email}</span>

                <div className="px-4 mt-1">
                  <p className="fonts">{biography} </p>
                </div>
                <div className="mt-4">
                  <span className="text-white p-2 rounded bg-primary font-weight-italic">
                    {format(parseISO(createdDate), "'Joined ' LLLL yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
