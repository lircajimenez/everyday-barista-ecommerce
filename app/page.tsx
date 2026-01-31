import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import hero from "@/public/hero-01.webp";
import CategoryCard from "@/components/category-card";
import categories from "@/lib/categories";

export default async function Home() {
  const productsByCategory: { [category: string]: Stripe.Product[] } = {};
  for (const category of categories) {
    const result = await stripe.products.search({
      query: `metadata['category']:'${category}'`,
      limit: 1,
      expand: ["data.default_price"],
    });
    productsByCategory[category] = result.data;
  }

  return (
    <div>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center w-screen left-1/2 -translate-x-1/2 -mt-8">
        <div className="absolute inset-0">
          <Image alt="Coffee products background" fill src={hero} className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 sm:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-[#F1F3F3] sm:text-6xl">Your Ritual. Your Gear.</h2>
          <p className="mt-6 text-xl leading-8 text-[#F1F3F3] text-shadow-lg/30 max-w-2xl mx-auto mb-8">
            Great gear. Great coffee. Every day. <br />
            Discover premium coffee equipment and accessories that elevate your brewing experience.
          </p>
          <Button asChild variant="bordered" size="extra" icon={<ArrowRightIcon className="h-4 w-4" />}>
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      </section>
      <section className="py-20">
        <h2 className="text-6xl text-center uppercase font-extrabold mb-5 pb-12 tracking-wide">Discover all our products</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const product = productsByCategory[category][0];
            if (!product) return null; // Skip if no product for this category

            return (
              <li key={category}>
                <CategoryCard product={product} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
