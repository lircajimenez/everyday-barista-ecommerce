import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

function ProductCard({ product }: Props) {
  const price = product.default_price as Stripe.Price;
  console.log("PRODUCT", product);

  return (
    <Card className="group hover:shadow-xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0 bg-[#f4f4f5] overflow-hidden rounded-t-xl">
      {product.images && product.images[0] && (
        <Link className="relative h-60 w-full" href={`/products/${product.id}`}>
          <Image
            // className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            fill={true}
            objectFit="cover" //"cover" ?
            alt={product.name}
            src={product.images[0]}
          />
        </Link>
      )}

      <CardContent className="pt-4 pb-8 flex justify-between items-start">
        <Link className="text-md font-medium text-gray-800 w-3/4" href={`/products/${product.id}`}>
          <span className="underline-chase-link leading-relaxed">{product.name}</span>
        </Link>
        {/* {product.description && <p className="text-gray-600 text-sm mb-2">{product.description}</p>} */}
        {price && price.unit_amount && (
          <p className="text-sm font-light text-gray-900 w-1/4 text-end">${(price.unit_amount / 100).toFixed(2)}</p>
        )}
        {/* <Button className="mt-4 bg-black text-white">View Details</Button> */}
      </CardContent>
    </Card>
  );
}

export default ProductCard;
