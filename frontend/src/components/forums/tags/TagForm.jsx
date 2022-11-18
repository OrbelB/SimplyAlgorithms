import {
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectAllTags,
  selectAllTagsById,
} from "../../../store/reducers/tags-reducer";

export default function TagForm({ currentTags, setCurrentTags }) {
  const [newTagName, setNewTagName] = useState("");
  const [hasTagBeenAdded, setHasTagBeenAdded] = useState(false);
  const [tagId, setTagId] = useState("");
  const tagSelected = useSelector((state) => selectAllTagsById(state, tagId));
  const tagsAvailable = useSelector(selectAllTags);
  useEffect(() => {
    if (tagId !== "" && tagSelected !== undefined && hasTagBeenAdded) {
      if (!currentTags.find((tag) => tag.tagId === tagId)) {
        setCurrentTags(
          currentTags.concat({ tag: tagSelected.tag, tagId: tagId })
        );
      }
      setHasTagBeenAdded(!hasTagBeenAdded);
    }
  }, [currentTags, tagId, tagSelected, hasTagBeenAdded, setCurrentTags]);

  const removeTag = (currTagId, tagName) => {
    let tempTags = [...currentTags];
    if (currTagId === "") {
      setCurrentTags(
        tempTags.filter((tag) => tag.tag.trim() !== tagName.trim())
      );
      return;
    }
    setCurrentTags(tempTags.filter((tag) => tag.tagId !== currTagId));
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
    setCurrentTags(currentTags.concat({ tag: newTagName, tagId: "" }));
    setNewTagName("");
  };
  return (
    <>
      <h4 className="row justify-content-center">Current Categories</h4>
      <div className="row justify-content-center mt-3 mb-5">
        {currentTags?.map((tag) => (
          <Chip
            key={tag.tagId === "" ? nanoid() : tag.tagId}
            className="col-auto me-2"
            label={tag.tag}
            variant="outlined"
            onDelete={() => removeTag(tag.tagId, tag.tag)}
          />
        ))}
      </div>
      <FormControl className="col-auto w-75 mb-5">
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Category"
          onChange={addTagToSave}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {tagsAvailable.map((tag) => (
            <MenuItem value={tag.tagId} key={tag.tagId}>
              {tag.tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-auto w-75 mb-5"
        id="margin-dense"
        label="or create your own category"
        value={newTagName}
        onChange={updateTagName}
        onKeyDown={addNewTag}
        type="text"
      />
    </>
  );
}
