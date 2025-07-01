"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import Breadcrumb from "@/components/breadcrumb";

function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Breadcrumb customTitle="Order Success" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase. Your order is being processed.</p>
      <Link href="/products" className="text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
