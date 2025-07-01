import ProductList from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import Breadcrumb from "@/components/breadcrumb";

async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div className="pb-8">
      <Breadcrumb customTitle="All Products" />
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">All Products</h1>
      <ProductList products={products.data} />
    </div>
  );
}

export default ProductsPage;
