export const STOCK_STATUS = {
  OUT_OF_STOCK: 0,
  LOW_STOCK: 10,
} as const

export const STOCK_STATUS_LABELS = {
  [STOCK_STATUS.OUT_OF_STOCK]: "Out of Stock",
  [STOCK_STATUS.LOW_STOCK]: "Low Stock",
} as const

export const STOCK_STATUS_COLORS = {
  [STOCK_STATUS.OUT_OF_STOCK]: "destructive",
  [STOCK_STATUS.LOW_STOCK]: "secondary",
} as const 