import ProductList from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import { formatDashString } from "@/lib/utils/string";

async function CategoryPage({ params }: { params: { category: string[] } }) {
  // Support for catch-all route: /products/category/[...category]
  const category = params.category?.join("/") || "";
  //   const category = params.category;
  //   console.log("category", category);

  // Search for products in the specified category
  const categoryProducts = await stripe.products.search({
    query: `metadata['category']:'${category}'`,
  });

  // Convert to plain objects to avoid serialization issues
  const plainProducts = JSON.parse(JSON.stringify(categoryProducts.data));

  return (
    // LANDING PAGE FOR CATEGORY
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold capitalize">{formatDashString(category)} Products</h1>
      <h2></h2>
      {plainProducts.length > 0 ? (
        <ProductList products={plainProducts} />
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
