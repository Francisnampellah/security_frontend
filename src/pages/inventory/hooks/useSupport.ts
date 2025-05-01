import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchManufacturers, deleteManufacturer, addManufacturer } from "../../../services/manufacture";
import { Manufacturer } from "../../../type";
import { fetchCategories, deleteCategory, createCategory } from "../../../services/category";
import { fetchUnits, deleteUnit, addUnit } from "../../../services/unit";
import { useNotification } from "../../../hooks/useNotification";

export function useSupport() {
  const { success, error: showError } = useNotification();
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
      success("Manufacturer deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete manufacturer", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const addManufacturerMutation = useMutation({
    mutationFn: addManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      success("Manufacturer added successfully");
    },
    onError: (error) => {
      showError("Failed to add manufacturer", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
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
      success("Category deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete category", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      success("Category added successfully");
    },
    onError: (error) => {
      showError("Failed to add category", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
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
      success("Unit deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete unit", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const addUnitMutation = useMutation({
    mutationFn: addUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      success("Unit added successfully");
    },
    onError: (error) => {
      showError("Failed to add unit", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
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