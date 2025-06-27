import ProductDetail from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await stripe.products.retrieve(id, { expand: ["default_price"] });
  // pass plain objects from server to client to get rid of error
  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}

export default ProductPage;
