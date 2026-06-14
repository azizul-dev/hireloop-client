// src/app/dashboard/admin/users/page.jsx
import { getUserList } from '@/lib/api/users';
import AdminUsersTable from '@/components/dashboard/AdminUsersTable';

const AdminUsersPage = async () => {
  const data = await getUserList();
  const users = Array.isArray(data) ? data : data?.users || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Users ({users.length})</h2>
      <AdminUsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;