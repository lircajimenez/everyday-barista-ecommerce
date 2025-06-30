"use client";

import { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./product-card";
import SearchBar from "./search-bar";

interface Props {
  products: Stripe.Product[];
}

function ProductList({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const categoryMatch = product.metadata.category.toLowerCase().includes(term);

    return nameMatch || categoryMatch;
  });

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
