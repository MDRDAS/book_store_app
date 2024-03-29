import { loadStripe, type Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>
export const getStripe = (connectedAccountId?: string) => {
    if (stripePromise === null) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
            { stripeAccount: connectedAccountId }
        )
    }
    return stripePromise
}
