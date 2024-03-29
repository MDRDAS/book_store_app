import { type Store } from "@/db/schema"
import { create } from "zustand"

type OmittedStore = Omit<
    Store,
    | "stripeAccountId"
    | "createdAt"
    | "updatedAt"
    | "ownerId"
    | "isDeleted"
    | "deletedAt"
>

interface StoreProps extends OmittedStore {
    setStore: (store: OmittedStore) => void
    setId: (id: number) => void
    setLogo: (logo: string) => void
    setName: (name: string) => void
    setThumbnail: (thumbnail: string) => void
    setDescription: (description: string) => void
}

export const useStore = create<StoreProps>((set) => ({
    logo: "",
    thumbnail: "",
    name: "",
    description: "",
    id: 0,
    ownerId: "",
    slug: "",
    active: false,
    setStore: (store) => set(() => store),
    setLogo: (logo) => set(() => ({ logo })),
    setId: (id) => set(() => ({ id })),
    setName: (name) => set(() => ({ name })),
    setThumbnail: (thumbnail) => set(() => ({ thumbnail })),
    setDescription: (description) => set(() => ({ description })),
}))
