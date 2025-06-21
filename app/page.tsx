import Image from "next/image";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/Carousel";
import hero from "@/public/hero-01.webp";
import ProductCard from "@/components/product-card";
import CategoryCard from "@/components/category-card";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    // limit: 5,
    limit: 8,
  });

  const category = await stripe.products.search({
    query: "metadata['category']:'espresso machines'",
  });

  console.log(products);
  console.log(category);
  return (
    <div>
      {/* <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your Ritual. Your Gear.</h2>
            <p className="text-neutral-600">Great gear. Great coffee. Every day.</p>
            <Button
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
              asChild
              variant="default"
            >
              <Link className="inline-flex items-center justify-center rounded-full px-6 py-3" href="/products">
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image alt="Banner Image" width={450} height={450} src={products.data[0].images[0]} />
        </div>
      </section> */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          {/* <Image alt="Coffee brewing background" fill src={products.data[0].images[0]} className="object-cover" priority /> */}
          <Image alt="Coffee brewing background" fill src={hero} className="object-cover" priority />
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
        {/* <Carousel products={products.data} /> */}
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* {products.data &&
            products.data.map((product, key) => (
              <li key={key}>
                <ProductCard product={product} />
              </li>
            ))} */}
          {products.data &&
            products.data.map((product, key) => (
              <li key={key}>
                <CategoryCard product={product} />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
