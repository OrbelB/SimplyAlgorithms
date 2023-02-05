import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { fetchUserForumsViewed } from '../services/forum';
import useUpdateStore from '../hooks/use-updateStore';

export default function DashboardPage() {
  const { status } = useSelector((state) => state.viewedForums);
  const { userId: authUserId, isLoggedIn } = useSelector((state) => state.auth);

  const forumViewsUpdateStore = useMemo(() => {
    return {
      conditions: [status === 'idle' && isLoggedIn && authUserId !== null],
      actions: [[fetchUserForumsViewed]],
      arguments: [[{ userId: authUserId, page: 0, size: 10 }]],
    };
  }, [authUserId, isLoggedIn, status]);

  useUpdateStore(
    forumViewsUpdateStore.conditions,
    forumViewsUpdateStore.actions,
    forumViewsUpdateStore.arguments
  );

  return <Dashboard />;
}
