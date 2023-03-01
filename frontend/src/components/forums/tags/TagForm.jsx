import {
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  selectAllTags,
  selectAllTagsById,
} from '../../../store/reducers/tags-reducer';
import { fetchTags } from '../../../services/tag';

export default function TagForm({ currentTags, setCurrentTags }) {
  const dispatch = useDispatch();
  const [newTagName, setNewTagName] = useState('');
  const [hasTagBeenAdded, setHasTagBeenAdded] = useState(false);
  const [tagId, setTagId] = useState('');
  const tagSelected = useSelector((state) => selectAllTagsById(state, tagId));
  const tagsAvailable = useSelector(selectAllTags);
  const { totalElements } = useSelector((state) => state.tags);

  // fetch all tags in database
  if (tagsAvailable.length !== totalElements || tagsAvailable.length === 0) {
    dispatch(
      fetchTags({ page: 0, size: totalElements === 0 ? 10 : totalElements })
    );
  }

  useEffect(() => {
    if (tagId !== '' && tagSelected !== undefined && hasTagBeenAdded) {
      const isTagNotPresent = !currentTags.find((tag) => tag.tagId === tagId);
      if (isTagNotPresent) {
        setCurrentTags(currentTags.concat({ tag: tagSelected.tag, tagId }));
      }
      setHasTagBeenAdded(!hasTagBeenAdded);
    }
  }, [tagId, tagSelected, hasTagBeenAdded, setCurrentTags, currentTags]);

  const removeTag = (currTagId, tagName) => {
    const tempTags = [...currentTags];
    if (currTagId === '') {
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
    if (e.key !== 'Enter') return;
    setCurrentTags(currentTags.concat({ tag: newTagName, tagId: '' }));
    setNewTagName('');
  };
  return (
    <>
      <div className="row justify-content-center mb-5">
        {currentTags?.map((tag) => (
          <Chip
            key={tag.tagId === '' ? nanoid() : tag.tagId}
            className="col-auto m-auto mt-3"
            label={tag.tag}
            variant="outlined"
            onDelete={() => removeTag(tag.tagId, tag.tag)}
          />
        ))}
      </div>
      <FormControl className="col-auto w-100 mb-5">
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Category"
          value={tagId}
          onChange={addTagToSave}
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          {tagsAvailable.map((tag) => (
            <MenuItem value={tag.tagId} key={tag.tagId}>
              {tag.tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="col-auto w-100 mb-5"
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
