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