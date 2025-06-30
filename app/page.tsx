import Image from "next/image";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import hero from "@/public/hero-01.webp";
import CategoryCard from "@/components/category-card";
import categories from "@/lib/categories";

export default async function Home() {
  const productsByCategory: { [category: string]: any[] } = {};
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
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image alt="Coffee products background" fill src={hero} className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 sm:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Your Ritual. Your Gear.</h2>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
            Great gear. Great coffee. Every day. <br />
            Discover premium coffee equipment and accessories that elevate your brewing experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="rounded-full bg-white px-8 py-3 text-black hover:bg-gray-100">
              <Link href="/products">Browse All Products</Link>
            </Button>
            {/* <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-black">
              <Link href="/about">Learn More</Link>
            </Button> */}
          </div>
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-2xl font-bold capitalize mb-5">Categories</h2>
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
