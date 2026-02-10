import { Id } from "@/convex/_generated/dataModel"
import { create } from "zustand"

type CatalogFilterStore = {
    selectedCategories: Id<"categories">[];
    setCategories: (ids: Id<"categories">[]) => void;
    toggleCategory: (id: Id<"categories">) => void;
    reset: ()=> void
}

export const useCatalogFilters = create<CatalogFilterStore>(
    (set) => ({
        selectedCategories: [],

        setCategories: (ids) =>
            set({selectedCategories: ids}),

        toggleCategory: (id) =>
            set((state) => ({
                selectedCategories: state.selectedCategories.includes(id)
                    ? state.selectedCategories.filter(c=> c !== id)
                    : [...state.selectedCategories, id],
            })),

        reset: () => set({selectedCategories: []})
    })
)