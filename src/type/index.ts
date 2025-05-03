export interface Manufacturer {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Unit {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Category {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Stock {
  id: number;
  medicineId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

export interface Medicine {
    id: number
    name: string
    manufacturerId: number
    unitId: number
    categoryId: number
    dosage?: string
    sellPrice: string
    createdAt: string
    updatedAt: string
    manufacturer: {
      id: number
      name: string
      createdAt: string
      updatedAt: string
    }
    unit: {
      id: number
      name: string
      createdAt: string
      updatedAt: string
    }
    category: {
      id: number
      name: string
      createdAt: string
      updatedAt: string
    }
    stock: {
      id: number
      medicineId: number
      quantity: number
      createdAt: string
      updatedAt: string
    }
  }

  export interface Batch {
    id: number;
    purchaseDate: string;
    note?: string;
  }
  
  export interface Purchase {
    id: number;
    medicineId: number;
    batchId: number;
    userId: number;
    quantity: number;
    costPerUnit: string;
    createdAt: string;
    updatedAt: string;
    medicine: {
      id: number;
      name: string;
      manufacturerId: number;
      unitId: number;
      categoryId: number;
      dosage: string | null;
      sellPrice: string;
      createdAt: string;
      updatedAt: string;
      manufacturer: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      unit: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      category: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    };
    batch: {
      id: number;
      purchaseDate: string;
      createdAt: string;
      updatedAt: string;
      note: string | null;
    };
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  export interface Sell {
    id: number;
    medicineId: number;
    userId: number;
    quantity: number;
    totalPrice: string;
    createdAt: string;
    updatedAt: string;
    medicine: {
      id: number;
      name: string;
      manufacturerId: number;
      unitId: number;
      categoryId: number;
      dosage: string | null;
      sellPrice: string;
      createdAt: string;
      updatedAt: string;
      manufacturer: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      unit: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      category: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    };
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  export interface Transaction {
    id: number;
    referenceNumber: string;
    type: 'SALE' | 'PURCHASE' | 'EXPENSE' | 'FINANCE';
    amount: number;
    userId: number;
    note?: string;
    taxApplied?: number;
    sellId?: number;
    purchaseId?: number;
    createdAt: string;
    updatedAt: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
    sell?: {
      id: number;
      medicine: {
        id: number;
        name: string;
      };
      quantity: number;
      totalPrice: number;
    };
    purchase?: {
      id: number;
      medicine: {
        id: number;
        name: string;
      };
      quantity: number;
      costPerUnit: number;
    };
  }

  export interface CreateTransactionData {
    type: 'SALE' | 'PURCHASE' | 'EXPENSE' | 'FINANCE';
    amount: number;
    note?: string;
    taxApplied?: number;
    sellId?: number;
    purchaseId?: number;
  }
  
  export interface GetTransactionsParams {
    startDate?: string;
    endDate?: string;
    type?: 'SALE' | 'PURCHASE' | 'EXPENSE' | 'FINANCE';
    page?: number;
    pageSize?: number;
  }
  
    