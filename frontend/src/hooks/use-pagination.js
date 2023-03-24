import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function usePaginationWithInfiniteScroll({
  totalPages,
  currPage,
  updateCurrPage,
  itemId,
  itemName,
  fetchFunction,
  status,
}) {
  // use to get the last element of the comment list
  const lastElementRef = useRef();
  // to load more comments when the user scrolls to the bottom of the comment list
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();

  // fetches the next page of comments when the user scrolls to the bottom of the comment list
  useEffect(() => {
    if (totalPages && totalPages >= currPage && loadMore) {
      dispatch(fetchFunction({ [itemName]: itemId, size: 10, page: currPage }));
    }
  }, [
    currPage,
    dispatch,
    fetchFunction,
    itemId,
    itemName,
    loadMore,
    totalPages,
  ]);

  // this callback function is used to observe the current last element of the comment list
  // and checks if the user has scrolled to the bottom of the comment list
  // if the user has scrolled to the bottom of the comment list, then it will trigger the fetch
  const lastElementChild = useCallback(
    (node) => {
      if (status === 'pending') return;
      // disconnect the observer from the previous last element to connect it to the new last element
      if (lastElementRef.current) lastElementRef.current.disconnect();
      // create a new observer to observe the new last element
      lastElementRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalPages > currPage + 1) {
          dispatch(updateCurrPage());
          setLoadMore(true);
        }
      });
      // if the node exists, then connect the observer to the new last element node
      if (node) lastElementRef.current.observe(node);
    },
    [currPage, dispatch, status, totalPages, updateCurrPage]
  );

  return {
    lastElementChild,
  };
}
