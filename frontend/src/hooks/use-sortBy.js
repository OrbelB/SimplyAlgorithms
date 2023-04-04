import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function useSortBy({
  actionToDispatch,
  userId = null,
  jwtAccessToken,
  status = null,
}) {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useSearchParams();

  const handleSortBy = (value) => {
    if (status === 'loading' || status === 'pending') return;
    if (
      (value === '' && sortBy.get('sortBy') === '') ||
      (sortBy.get('sortBy') && sortBy.get('sortBy').toString() === value)
    ) {
      return;
    }

    sortBy.set('sortBy', value);
    setSortBy(sortBy, {
      replace: true,
    });
    switch (sortBy.get('sortBy')) {
      case 'Created Date':
        dispatch(
          actionToDispatch({
            page: 0,
            size: 20,
            sortBy: 'createdDate',
            userId,
            jwtAccessToken,
          })
        );
        break;
      case 'createdDate':
        dispatch(
          actionToDispatch({
            page: 0,
            size: 20,
            sortBy: 'createdDate',
            userId,
            jwtAccessToken,
          })
        );
        break;
      case 'Alphabetical':
        dispatch(
          actionToDispatch({
            page: 0,
            size: 20,
            sortBy: 'title',
            userId,
            jwtAccessToken,
          })
        );
        break;
      default:
        dispatch(
          actionToDispatch({
            page: 0,
            size: 20,
            userId,
            jwtAccessToken,
          })
        );
    }
  };
  return { sortBy, handleSortBy };
}
