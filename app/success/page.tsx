"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import Breadcrumb from "@/components/breadcrumb";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Breadcrumb customTitle="Order Success" />
      <CheckCircleIcon className="h-40 w-40 text-green-500 m-auto" />
      <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
      <p className="mb-4">Thank you for your purchase. Your order is being processed.</p>
      <Link href="/products" className="text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
