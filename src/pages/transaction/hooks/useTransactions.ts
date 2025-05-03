import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import transactionApi from '@/services/transaction';
import { Transaction, CreateTransactionData } from '@/type';
import { useNotification } from '@/hooks/useNotification';

interface UseTransactionsProps {
  startDate?: string;
  endDate?: string;
  type?: 'SALE' | 'PURCHASE';
}

interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: number;
}

export const useTransactions = ({ startDate, endDate, type }: UseTransactionsProps = {}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const { data, isLoading, error: queryError, refetch } = useQuery({
    queryKey: ['transactions', page, pageSize, startDate, endDate, type],
    queryFn: () => transactionApi.getAll({ 
      page, 
      pageSize, 
      startDate, 
      endDate, 
      type 
    }),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTransactionData) => transactionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      success('Transaction created successfully');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to create transaction');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateTransactionData) => transactionApi.update(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      success('Transaction updated successfully');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to update transaction');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => transactionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      success('Transaction deleted successfully');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to delete transaction');
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
  };

  return {
    transactions: data || [],
    total: data?.length || 0,
    isLoading,
    error: queryError,
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    refetch,
    createTransaction: createMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}; 