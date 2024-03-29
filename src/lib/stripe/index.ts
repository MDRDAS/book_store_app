import { env } from "@/env.mjs"
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "Bookji",
        version: "0.1.0",
    },
    typescript: true,
})
