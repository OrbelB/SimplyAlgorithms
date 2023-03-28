import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export default function useSearchBar({
  searchFrom,
  valueSearched,
  actionToDispatch,
  debounceTime = 350,
  status,
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
        `^${searchTerm.concat('*').toLowerCase().replace(/\*/g, '.*')}$`
      ).test(searchValue.toLowerCase());
    });
  }, [searchFrom, searchTerm, valueSearched]);

  const handleSearch = debounce((e) => {
    searchParam.set('filterBy', e.target.value);
    if (status === 'loading' || status === 'pending') return;
    setSearchParam(searchParam, {
      replace: true,
    });
    dispatch(
      actionToDispatch({
        page: 0,
        size: 20,
        filterBy: searchParam.get('filterBy'),
        [valueSearched]: valueSearched,
      })
    );
    setSearchTerm(e.target.value);
  }, debounceTime);

  return { searchTerm, handleSearch, searchResults };
}
