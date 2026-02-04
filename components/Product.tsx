import { formatearMoneda } from "@/utils/CurrencyFormat";
import Link from "next/link";

interface ProductProps {
    name: string,
    price: number,
    imageUrl: string,
    url: string    
}

const Product = ({
    name, price, imageUrl, url
}: ProductProps )=> {
    return (
        <div className="flex flex-col h-fit bg-[#eee] w-full rounded-lg">
            <Link className="p-4" href={`Catalogo/${url}`}>
                <img className="rounded-lg size-64 object-cover mb-1" src={imageUrl} alt={name} />
                <div>
                    <p className="text-lg font-semibold">{name}</p>
                    <span className="text-md font-medium text-[#B86112]">{formatearMoneda(price)}</span>
                </div>
            </Link>
        </div>
    );
}
 
export default Product;