import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

function CategoryCard({ product }: Props) {
  const price = product.default_price as Stripe.Price;
  return (
    <Link className="block h-full" href={`/products/category/${product.metadata.category}`}>
      <Card className="group hover:shadow-2xl transition duration-300 rounded-xl border py-0 h-full flex flex-col border-gray-300 gap-0 ">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg" layout="fill" objectFit="cover" alt={product.name} src={product.images[0]} />
          </div>
        )}

        <CardContent className="w-full p-2 bg-black rounded-b-lg">
          <CardTitle className="text-xl text-center font-bold  text-white">{product.metadata.category}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;
