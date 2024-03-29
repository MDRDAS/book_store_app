import {
    boolean,
    maxLength,
    minLength,
    object,
    optional,
    string,
} from "valibot"

export const userPrivateMetadataSchema = object({
    // role: enum(["user", "admin", "super_admin"]),
    stripePriceId: optional(string()),
    stripeSubscriptionId: optional(string()),
    stripeCustomerId: optional(string()),
    stripeCurrentPeriodEnd: optional(string()),
})

export const generalInformationSchema = object({
    firstName: string("First name is required", [
        minLength(1, "The first name must be above the 1 characters"),
        maxLength(50, "The first name must be below the 50 characters"),
    ]),
    lastName: string("Last name is required", [
        minLength(1, "The last name must be above the 1 characters"),
        maxLength(50, "The last name must be below the 50 characters"),
    ]),
    username: string("Username is required"),
})

export const cookiesSettingsSchema = object({
    strictlyNecessary: boolean(),
    functionalCookies: boolean(),
    performanceCookies: boolean(),
    analyticsCookies: boolean(),
})

export const emailSettingSchema = object({
    newOrder: boolean(),
    itemUpdate: boolean(),
    itemComment: boolean(),
    buyerReview: boolean(),
})

export const updateUserSchema = generalInformationSchema
