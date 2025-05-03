import { useState } from 'react';
import { User } from '../../types/user';
import { UserTable } from './components/UserTable';
import { CreateUserDialog } from './components/CreateUserDialog';
import { EditUserDialog } from './components/EditUserDialog';
import { useUsers } from './hooks/useUser';

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    isDeleting,
  } = useUsers();

  const handleDelete = async (id: number) => {
    deleteUser(id);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <UserTable
        users={users}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        isDeleting={isDeleting}
        handleAddUser={handleCreate}
      />

      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateUser={createUser}
      />

      {selectedUser && (
        <EditUserDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={selectedUser}
          onUpdateUser={updateUser}
        />
      )}
    </div>
  );
} 