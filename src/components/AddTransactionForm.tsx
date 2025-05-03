import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddTransactionFormProps {
  onSubmit: (values: any) => void;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        {/* Form content will be handled by useTransaction hook */}
      </DialogContent>
    </Dialog>
  );
}; 