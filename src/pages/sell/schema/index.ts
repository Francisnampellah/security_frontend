import { z } from "zod"

export const SellSchema = z.object({
  quantity: z.string().refine((val) => {
    const num = Number.parseInt(val)
    return !isNaN(num) && num > 0
  }, {
    message: "Quantity must be a positive number.",
  }),
  totalPrice: z.string().refine((val) => {
    const num = Number.parseFloat(val)
    return !isNaN(num) && num >= 0
  }, {
    message: "Total price must be a non-negative number.",
  }),
}) 