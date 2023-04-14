import { useMemo, useState, useCallback, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import debounce from 'lodash.debounce';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { fetchTopicList } from '../../services/topic';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  borderColor: theme.palette.info.main,
  borderWidth: '1px',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledAutcomplete = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  '& .MuiAutocomplete-input': {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      '&:focus': {
        width: '25ch',
      },
      '&:not(:focus)': {
        width: '15ch',
      },
    },
    [theme.breakpoints.down('lg')]: {
      width: 'auto',
      '&:focus': {
        width: '30ch',
      },
      '&:not(:focus)': {
        width: '20ch',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      '&:focus': {
        width: '15ch',
      },
      '&:not(:focus)': {
        width: '8ch',
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      '&:focus': {
        width: '12ch',
      },
      '&:not(:focus)': {
        width: '5ch',
      },
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    border: 'none',
  },
}));

function SearchBar() {
  const [currentTopic, setCurrentTopic] = useState(null);
  const { topicList, status } = useSelector((state) => state.topic);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = status === 'running';
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open && topicList.length === 0) {
      dispatch(
        fetchTopicList({
          page: 0,
          size: 15,
        })
      );
    }
  }, [open, topicList, dispatch]);
  const navigateToTopic = useCallback(
    (topicInfo) => {
      if (!topicInfo) return;
      navigate(`/topic/${topicInfo?.title}`);
      setCurrentTopic(null);
    },
    [navigate]
  );

  const fetchNewTopics = debounce((value) => {
    if (
      value === '' ||
      value === null ||
      topicList.find((topic) => topic.title === value)
    )
      return;
    dispatch(
      fetchTopicList({
        page: 0,
        size: 10,
        title: value,
      })
    );
  }, 400);

  const searchBar = useMemo(() => {
    return (
      <Search>
        <StyledAutcomplete
          fullWidth
          loadingText="Loading..."
          clearOnBlur
          options={topicList}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          clearIcon={<ClearIcon fontSize="small" />}
          clearOnEscape
          onClick={navigateToTopic}
          onClose={() => {
            setOpen(false);
          }}
          value={currentTopic}
          loading={status === 'running' || loading}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          includeInputInList
          noOptionsText="No Topic With This Name"
          onChange={(_, input) => {
            setCurrentTopic(input);
            navigateToTopic(input);
          }}
          getOptionLabel={(option) => option.title}
          onInputChange={(_, newInputValue) => {
            fetchNewTopics(newInputValue);
          }}
          renderInput={(params) => (
            <StyledTextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              placeholder="Search topic pages..."
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon color="inherit" size="auto" />,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size="auto" />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Search>
    );
  }, [
    currentTopic,
    fetchNewTopics,
    loading,
    navigateToTopic,
    open,
    status,
    topicList,
  ]);

  return searchBar;
}

export default memo(SearchBar);
