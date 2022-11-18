import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RiQuestionnaireFill } from "react-icons/ri";
import Chip from "@mui/material/Chip";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectAllTags,
  selectAllTagsById,
} from "../../../store/reducers/tags-reducer";
import useValidateInput from "../../../hooks/use-ValidateInput";
import { useEffect } from "react";
import { createForum } from "../../../services/forum";

export default function Post() {
  const tags = useSelector(selectAllTags);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [tagId, setTagId] = useState("");
  const [hasTagBeenAdded, setHasTagBeenAdded] = useState(false);
  const tagSelected = useSelector((state) => selectAllTagsById(state, tagId));
  const authUserId = useSelector((state) => state.auth.userId);
  const { jwtAccessToken, isLoggedIn } = useSelector((state) => state.auth);
  const { pageId, status } = useSelector((state) => state.forum);
  const [showSignUp, setShowSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    value: title,
    hasError: titleInputHasError,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleHandler,
  } = useValidateInput((value) => value.trim() !== "");

  const {
    value: message,
    hasError: messageInputHasError,
    valueIsValid: messageIsValid,
    valueChangeHandler: messageChangedHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessageHandler,
  } = useValidateInput((value) => value.trim() !== "");

  useEffect(() => {
    if (tagId !== "" && tagSelected !== undefined && hasTagBeenAdded) {
      if (!tagsSelected.find((tag) => tag.tagId === tagId)) {
        setTagsSelected(
          tagsSelected.concat({ tag: tagSelected.tag, tagId: tagId })
        );
      }
      setHasTagBeenAdded(!hasTagBeenAdded);
    }
  }, [tagsSelected, hasTagBeenAdded]);

  const removeTag = (passedTagId, tagName) => {
    let tempTags = [...tagsSelected];
    if (passedTagId === "") {
      setTagsSelected(
        tempTags.filter((tag) => tag.tag.trim() !== tagName.trim())
      );
      return;
    }
    setTagsSelected(tempTags.filter((tag) => tag.tagId !== passedTagId));
  };
  const addTagToSave = (e) => {
    setTagId(e.target.value);
    setHasTagBeenAdded(!hasTagBeenAdded);
  };

  const updateTagName = (e) => {
    setNewTagName(e.target.value);
  };

  const addNewTag = (e) => {
    if (e.key !== "Enter") return;
    setTagsSelected(tagsSelected.concat({ tag: newTagName, tagId: "" }));
    setNewTagName("");
  };

  const saveNewForum = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location }, replace: true });
    }
    if (!canFormBeSubmitted) return;
    dispatch(
      createForum({
        createdForum: {
          descriptionText: message,
          title: title,
          photo: "",
          video: "",
          userDto: {
            userId: authUserId,
          },
          tags: tagsSelected,
        },
        accessToken: jwtAccessToken,
      })
    );
    resetMessageHandler();
    resetTitleHandler();
    setTagsSelected([]);
  };

  const handleShow = () => {
    setShowSignUp(!showSignUp);
  };
  if(pageId !== "" && status === "successToIdle") {
    navigate(`${pageId}`, { replace: true });
  }

  let canFormBeSubmitted = false;
  if (titleIsValid && messageIsValid) canFormBeSubmitted = true;
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        onClick={handleShow}
      >
        <div>
          Ask A Question
          <RiQuestionnaireFill />
        </div>
      </button>

      {/* <!-- Modal --> */}
      <Modal
        show={showSignUp}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id={"contained-modal-title-vcenter"}>
            <h2 className="text-uppercase text-center">My Forum Post</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="align-items-center text-center">
          <div className="mb-0 form-group">
            <label htmlFor="forum_post_title" className="col-form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="forum_post_title"
              value={title}
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
            />
          </div>
          <div className="col-md-4 w-100">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <select
              id="inputCategory"
              className="form-select"
              onChange={addTagToSave}
            >
              {tags.map((tag) => (
                <option value={tag.tagId} key={tag.tagId}>
                  {tag.tag}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 w-100 form-group">
            <label htmlFor="question_categories" className="col-form-label">
              Or create your own category
            </label>
            <input
              type="text"
              class="form-control"
              id="question_categories"
              value={newTagName}
              onChange={updateTagName}
              onKeyDown={addNewTag}
            />
          </div>
          <div className="row mt-2 justify-content-center">
            {tagsSelected?.map((tag) => (
              <Chip
                key={tag.tagId === "" ? nanoid() : tag.tagId}
                className="col-auto m-1"
                label={tag.tag}
                variant="outlined"
                onDelete={() => removeTag(tag.tagId, tag.tag)}
              />
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="question_text" className="col-form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="forum_post_question"
              value={message}
              onChange={messageChangedHandler}
              onBlur={messageBlurHandler}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveNewForum}
            disabled={!canFormBeSubmitted}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
      {/* <div
        className="modal fade"
        id="staticBackdrop"
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
                My Forum Post
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-0 form-group">
                <label htmlFor="forum_post_title" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="forum_post_title"
                  value={title}
                  onChange={titleChangedHandler}
                  onBlur={titleBlurHandler}
                />
              </div>
              <div className="col-md-4 w-100">
                <label htmlFor="inputCategory" className="form-label">
                  Category
                </label>
                <select
                  id="inputCategory"
                  className="form-select"
                  onChange={addTagToSave}
                >
                  {tags.map((tag) => (
                    <option value={tag.tagId} key={tag.tagId}>
                      {tag.tag}
                    </option>
                  ))}
                </select>
              </div>

              <div class="col-md-4 w-100 form-group">
                <label htmlFor="question_categories" className="col-form-label">
                  Or create your own Category:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="question_categories"
                  value={newTagName}
                  onChange={updateTagName}
                  onKeyDown={addNewTag}
                />
              </div>
              <div className="row mt-2 justify-content-center">
                {tagsSelected?.map((tag) => (
                  <Chip
                    key={tag.tagId === "" ? nanoid() : tag.tagId}
                    className="col-auto m-1"
                    label={tag.tag}
                    variant="outlined"
                    onDelete={() => removeTag(tag.tagId, tag.tag)}
                  />
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="question_text" className="col-form-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  id="forum_post_question"
                  value={message}
                  onChange={messageChangedHandler}
                  onBlur={messageBlurHandler}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveNewForum}
                disabled={!canFormBeSubmitted}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
     */}
    </>
  );
}
