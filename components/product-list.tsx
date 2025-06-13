"use client";

import { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./product-card";

interface Props {
  products: Stripe.Product[];
}

function ProductList({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description ? product.description.toLowerCase().includes(term) : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
