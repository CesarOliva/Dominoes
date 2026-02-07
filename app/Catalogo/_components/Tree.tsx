import { Square } from "lucide-react";

type Category = {
    _id: string;
    categoryName: string;
    parentCategory?: string;
}

type CategoryNode = Category & {
    children: CategoryNode[]
}

export function categoryTree(categories: Category[]): CategoryNode[] {
    const map = new Map<String, CategoryNode>()

    categories.forEach(cat => {
        map.set(cat._id, { ...cat, children: [] });
    });

    const tree: CategoryNode[] = []

    map.forEach(cat => {
        if(cat.parentCategory){
            const parent = map.get(cat.parentCategory);
            parent?.children.push(cat);
        }else{
            tree.push(cat)
        }
    });

    return tree;
}

type Props = {
  categories: CategoryNode[]
}

export const Tree = ({ categories }: Props) => {
    return (
        <>
            {categories.map(cat => (
                <div key={cat._id} className="ml-4 mr-4 sm:mr-0">
                    <div className="group flex items-center gap-x-2 px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100 mb-2">
                        <Square onClick={()=> console.log(cat.categoryName)} className="cursor-pointer size-6"/>
                        
                        {cat.categoryName}
                    </div>
                    {cat.children.length > 0 && (
                        <Tree categories={cat.children} />
                    )}
                </div>
            ))}
        </>
    );
};
