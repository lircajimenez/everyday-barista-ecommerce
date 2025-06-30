"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import logo from "@/public/everyday-barista-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link className="hover:text-blue-600" href="/">
          <Image alt="Everyday Barista logo" width={60} height={60} src={logo} />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Homepage</Link>
          <Link href="/">About Us</Link>
          <Link className="hover:text-blue-600" href="/products">
            Products
          </Link>
          <Link className="hover:text-blue-600" href="/checkout">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="relative" href="/products">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>
          <Link className="relative" href="/checkout">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button className="md:hidden" variant="ghost" onClick={() => setMobileOpen((prev) => !prev)}>
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
