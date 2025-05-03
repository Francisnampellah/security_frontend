import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";


export function MedicineSearchModal({
  isOpen,
  onOpenChange,
  searchQuery,
  onSearchChange,
  filteredMedicines,
  onMedicineSelect,
}) {
  // Create a local state for the search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Update local state when prop changes
  useState(() => {
    setLocalSearchQuery(searchQuery);
  });
  
  // Handle local input changes and propagate to parent
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(value);
  };

  // Handle modal open/close
  const handleOpenChange = (open) => {
    if (!open) {
      // If dialog is closing, reset search
      onSearchChange(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Search Medicines</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4" onClick={(e) => e.stopPropagation()}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search medicine by name or code..."
            value={localSearchQuery}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
        
        <div className="max-h-80 overflow-y-auto space-y-2 py-2">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onMedicineSelect(medicine);
                }}
              >
                <div>
                  <h3 className="font-medium">{medicine.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {medicine.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{medicine.price}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={medicine.stock > 100 ? "default" : medicine.stock > 50 ? "outline" : "destructive"}
                    >
                      {medicine.stock} in stock
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              {searchQuery ? `No medicines found matching "${searchQuery}"` : "Start typing to search medicines"}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}