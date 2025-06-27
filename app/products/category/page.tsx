import Link from "next/link";
import { stripe } from "@/lib/stripe";
import categories from "@/lib/categories";
import ProductCard from "@/components/product-card";

async function CategoryPage() {
  const productsByCategory: { [category: string]: any[] } = {};
  for (const category of categories) {
    const result = await stripe.products.search({
      query: `metadata['category']:'${category}'`,
      limit: 3,
      expand: ["data.default_price"],
    });
    productsByCategory[category] = result.data;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-3xl font-bold capitalize">Products by Categories</h2>
      {categories.map((category) => (
        <div key={category} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold capitalize">
              <Link href={`/products/category/${category}`}>{category.replace(/-/g, " ")}</Link>
            </h2>
            <Link href={`/products/category/${category}`} className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productsByCategory[category].map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
