import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { formatDashString } from "@/lib/utils/string";

interface Props {
  product: Stripe.Product;
}

function CategoryCard({ product }: Props) {
  const category = product.metadata.category;
  return (
    <Link className="block h-full" href={`/products/category/${category}`}>
      <Card className="group hover:shadow-2xl transition duration-300 rounded-xl border py-0 h-full flex flex-col border-gray-300 gap-0 ">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
              layout="fill"
              objectFit="cover"
              alt={product.name}
              src={product.images[0]}
            />
          </div>
        )}

        <CardContent className="w-full p-2 bg-black rounded-b-lg">
          <CardTitle className="text-xl text-center font-bold  text-white">{formatDashString(category, true)}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;
