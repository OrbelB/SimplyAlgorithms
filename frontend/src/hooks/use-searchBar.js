/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export default function useSearchBar({
  searchFrom,
  valueSearched,
  actionToDispatch,
  debounceTime = 600,
  status,
  userId,
  jwtAccessToken,
}) {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useMemo(() => {
    return searchFrom?.filter((item) => {
      let searchValue;
      // if the valueSearched is a nested object, we need to use reduce to get the value
      if (valueSearched.includes('.')) {
        searchValue = valueSearched
          .split('.')
          .reduce((obj, key) => obj[key], item);
      } else {
        // otherwise search it directly from the item
        searchValue = item[valueSearched];
      }
      return new RegExp(
        `^${searchTerm?.concat('*')?.toLowerCase().replace(/\*/g, '.*')}$`
      ).test(searchValue.toLowerCase());
    });
  }, [searchFrom, searchTerm, valueSearched]);

  const handleSearch = useCallback(
    debounce((e) => {
      searchParam.set(valueSearched, e.target.value);
      if (status === 'loading' || status === 'pending') return;
      setSearchParam(searchParam, {
        replace: true,
      });
      dispatch(
        actionToDispatch({
          page: 0,
          size: 20,
          filterBy: searchParam.get(valueSearched),
          jwtAccessToken,
          userId,
          [valueSearched]: searchParam.get(valueSearched),
        })
      );
      setSearchTerm(e.target.value);
    }, debounceTime),
    [
      searchParam,
      dispatch,
      actionToDispatch,
      status,
      valueSearched,
      jwtAccessToken,
      userId,
    ]
  );

  return { searchTerm, handleSearch, searchResults };
}
