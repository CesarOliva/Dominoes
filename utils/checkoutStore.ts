import { create } from "zustand"

type CheckoutStore = {
    productSlug: string | null,
    setProductSlug: (slug: string) => void
    clear: ()=> void
}

export const useCheckoutStore = create<CheckoutStore>((set)=> ({
    productSlug: null,
    setProductSlug: (slug) => set({ productSlug: slug }),
    clear: () => set({ productSlug: null })
}))