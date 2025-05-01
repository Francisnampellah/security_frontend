import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchManufacturers, deleteManufacturer, addManufacturer } from "../../../services/manufacture";
import { Manufacturer } from "../../../type";
import { fetchCategories, deleteCategory, createCategory } from "../../../services/category";
import { fetchUnits, deleteUnit, addUnit } from "../../../services/unit";

export function useSupport() {
  const queryClient = useQueryClient();

  // Manufacturers
  const { data: manufacturers = [], isLoading: isLoadingManufacturers } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: fetchManufacturers,
  });

  const deleteManufacturerMutation = useMutation({
    mutationFn: deleteManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      toast.success("Manufacturer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete manufacturer");
    },
  });

  const addManufacturerMutation = useMutation({
    mutationFn: addManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      toast.success("Manufacturer added successfully");
    },
    onError: () => {
      toast.error("Failed to add manufacturer");
    },
  });

  // Categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully");
    },
    onError: () => {
      toast.error("Failed to add category");
    },
  });

  // Units
  const { data: units = [], isLoading: isLoadingUnits } = useQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  const deleteUnitMutation = useMutation({
    mutationFn: deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      toast.success("Unit deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete unit");
    },
  });

  const addUnitMutation = useMutation({
    mutationFn: addUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      toast.success("Unit added successfully");
    },
    onError: () => {
      toast.error("Failed to add unit");
    },
  });

  return {
    manufacturers,
    isLoadingManufacturers,
    deleteManufacturerMutation,
    addManufacturerMutation,

    categories,
    isLoadingCategories,
    deleteCategoryMutation,
    addCategoryMutation,

    units,
    isLoadingUnits,
    deleteUnitMutation,
    addUnitMutation,
  };
}