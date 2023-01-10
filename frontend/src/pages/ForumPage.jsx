import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forums from '../components/forums/forum_home/Forums';
import { fetchForumList } from '../services/forum';

export default function ForumPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.forums.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(
        fetchForumList({
          page: 0,
          size: 5,
          sortBy: 'createdDate',
        })
      );
    }
  }, [dispatch, status]);

  return <Forums />;
}
