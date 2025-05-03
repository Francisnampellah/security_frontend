import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, CreateUserDto, UpdateUserDto } from '../../../types/user';
import userService from '../../../services/user';
import { useNotification } from "../../../hooks/useNotification"


export function useUsers() {
  const queryClient = useQueryClient();
  const { success, error: showError } = useNotification();

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUserDto) => userService.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      success("User created successfully");
    },
    onError: (error) => {
      showError("Failed to create user", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: UpdateUserDto }) => 
      userService.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      success("User updated successfully");
    },
    onError: (error) => {
      showError("Failed to update user", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      success("User deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete user", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  return {
    users,
    isLoading,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
} 