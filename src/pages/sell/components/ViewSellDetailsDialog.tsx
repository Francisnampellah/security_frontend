"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sell } from "../../../type";

interface ViewSellDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sellDetails: Sell | null;
}

export function ViewSellDetailsDialog({ open, onOpenChange, sellDetails }: ViewSellDetailsDialogProps) {
  if (!sellDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell Details</DialogTitle>
          <DialogDescription>
            Details of the selected sell transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <strong>Medicine Name:</strong> {sellDetails.medicineName}
          </div>
          <div>
            <strong>Quantity:</strong> {sellDetails.quantity}
          </div>
          <div>
            <strong>Total Price:</strong> ${sellDetails.totalPrice}
          </div>
          <div>
            <strong>Date:</strong> {new Date(sellDetails.date).toLocaleString()}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}