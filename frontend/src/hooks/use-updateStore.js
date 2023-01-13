import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useUpdateStore(conditions, dispatchFunctions, args) {
  const dispatch = useDispatch();
  useEffect(() => {
    conditions.forEach((condition, index) => {
      if (condition) {
        dispatchFunctions[index].forEach((func, i) => {
          dispatch(func(args[index][i]));
        });
      }
    });
  }, [args, conditions, dispatch, dispatchFunctions]);
}
