"use client";

import { Id } from "@/convex/_generated/dataModel";

type Category = {
    _id: Id<"categories">;
    categoryName: string;
    parentCategory?: Id<"categories">;
};

type Props = {
    categories: Category[];
    selected: Id<"categories">[];
    onToggle: (id: Id<"categories">) => void;
};

export function CategoryTree({ categories, selected, onToggle }: Props) {
    const roots = categories.filter(c => !c.parentCategory);

    const renderNode = (node: Category) => {
        const children = categories.filter(
            c => c.parentCategory === node._id
        );

        return (
            <div key={node._id} className="ml-4">
                <label className="flex items-center gap-2 text-md border border-neutral-300 bg-[#eee] rounded px-2 py-1 mb-2">
                    <input
                        className="size-4 accent-[#B86112]"
                        type="checkbox"
                        checked={selected.includes(node._id)}
                        onChange={() => onToggle(node._id)}
                    />
                    {node.categoryName}
                </label>

                {children.map(renderNode)}
            </div>
        )
    };

    return <div>{roots.map(renderNode)}</div>;
}
