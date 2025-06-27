import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import { formatDashString } from "@/lib/utils/string";
import Link from "next/link";
import categories from "@/lib/categories";

async function CategoryPage() {
  const productsByCategory: { [category: string]: any[] } = {};
  for (const category of categories) {
    const result = await stripe.products.search({
      query: `metadata['category']:'${category}'`,
      limit: 3, // Only fetch a few for preview
      expand: ["data.default_price"],
    });
    productsByCategory[category] = result.data;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold capitalize">Categories</h1>
      <p className="text-center text-gray-500">Please select a category.</p>
      {/* Optionally, list all categories here */}
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
            {productsByCategory[category]?.length > 0 ? (
              productsByCategory[category].map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))
            ) : (
              <li className="text-gray-500">No products found in this category.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
