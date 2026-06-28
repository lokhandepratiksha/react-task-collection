import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  updateUserStatus,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUpdating,
} from '../store/usersSlice';

const STATUS_OPTIONS = ['active', 'inactive', 'rejected', 'pending'];

const STATUS_STYLE = {
  active:   { background: '#d1fae5', color: '#065f46' },
  inactive: { background: '#f3f4f6', color: '#374151' },
  rejected: { background: '#fee2e2', color: '#991b1b' },
  pending:  { background: '#fef3c7', color: '#92400e' },
};

// Per-row component so each row can read its own "updating" flag
function UserRow({ user }) {
  const dispatch = useDispatch();
  const isUpdating = useSelector(selectUpdating(user.id));

  const handleChange = (e) => {
    dispatch(updateUserStatus({ id: user.id, status: e.target.value }));
  };

  return (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '12px 16px' }}>{user.id}</td>
      <td style={{ padding: '12px 16px', fontWeight: 500 }}>{user.name}</td>
      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{user.email}</td>
      <td style={{ padding: '12px 16px' }}>
        <span style={{
          ...STATUS_STYLE[user.status],
          padding: '3px 10px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {user.status}
        </span>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <select
          value={user.status}
          onChange={handleChange}
          disabled={isUpdating}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '13px',
            cursor: isUpdating ? 'wait' : 'pointer',
            opacity: isUpdating ? 0.6 : 1,
          }}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {isUpdating && (
          <span style={{ marginLeft: 8, fontSize: 12, color: '#6b7280' }}>
            saving…
          </span>
        )}
      </td>
    </tr>
  );
}

export default function AdminUserTable() {
  const dispatch = useDispatch();
  const users    = useSelector(selectUsers);
  const loading  = useSelector(selectUsersLoading);
  const error    = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ margin: '32px 0' }}>
      <h2 style={{ marginBottom: 16 }}>Admin — User management</h2>

      {loading && <p>Loading users…</p>}
      {error   && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '10px 16px', color: '#374151' }}>ID</th>
                <th style={{ padding: '10px 16px', color: '#374151' }}>Name</th>
                <th style={{ padding: '10px 16px', color: '#374151' }}>Email</th>
                <th style={{ padding: '10px 16px', color: '#374151' }}>Current status</th>
                <th style={{ padding: '10px 16px', color: '#374151' }}>Change status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => <UserRow key={user.id} user={user} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}