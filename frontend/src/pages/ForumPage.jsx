import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Forums from '../components/forums/forum_home/Forums';
import useUpdateStore from '../hooks/use-updateStore';
import { fetchForumList } from '../services/forum';

export default function ForumPage() {
  const status = useSelector((state) => state.forums.status);
  const [sortBy] = useSearchParams();
  const forumsUpdateStore = useMemo(() => {
    return {
      conditions: [status === 'idle'],
      actions: [[fetchForumList]],
      arguments: [[{ page: 0, size: 10, sortBy: sortBy.get('sortBy') }]],
    };
  }, [sortBy, status]);

  useUpdateStore(
    forumsUpdateStore.conditions,
    forumsUpdateStore.actions,
    forumsUpdateStore.arguments
  );

  return <Forums />;
}
