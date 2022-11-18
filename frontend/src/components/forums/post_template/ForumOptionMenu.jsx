import { startOfYesterday } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteForum } from "../../../services/forum";
import { forumsActions } from "../../../store/reducers/forums-reducer";
export default function ForumOptionMenu({ pageId, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const onDeleteForum = () => {
    dispatch(forumsActions.deleteForum({ pageId: pageId }));
    dispatch(
      deleteForum({
        pageId: pageId,
        userId: userId,
        accessToken: jwtAccessToken,
      })
    );
    navigate("/forums", { replace: true });
  };
  const onEditForum = () => {
    //missing component to update the forum
    navigate(`/forums/edit/${pageId}`, {
      state: { from: location },
      replace: false,
    });
  };
  let permission = authUserId === userId;
  return (
    <>
      {permission && (
        <div className="btn-group dropdown-center align-self-start p-0">
          <i
            role={"button"}
            className={"dropdown-toggle-split bi bi-three-dots"}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <div className="dropdown-menu">
            <i
              role={"button"}
              className={"dropdown-item bi bi-trash text-danger"}
              onClick={onDeleteForum}
            >
              {" "}
              Delete
            </i>
            <i
              className={"dropdown-item bi bi-pencil-fill"}
              onClick={onEditForum}
              role={"button"}
            >
              {" "}
              Edit
            </i>
          </div>
        </div>
      )}
    </>
  );
}
