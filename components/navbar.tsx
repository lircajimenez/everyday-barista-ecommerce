"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import logo from "@/public/everyday-barista-logo.png";
import categories from "@/lib/categories";
import { formatDashString } from "@/lib/utils/string";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState<boolean>(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
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

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 350);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link className="hover:text-blue-600" href="/">
          <Image alt="Everyday Barista logo" width={60} height={60} src={logo} />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Homepage</Link>
          <Link href="/">About Us</Link>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link className="hover:text-blue-600 flex items-center space-x-1" href="/products">
              <span>Products</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Link>
            {productsDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-50 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products/category/${category}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    {formatDashString(category, true)}
                  </Link>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
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
              <div className="space-y-1">
                <Link href="/products" className="block hover:text-blue-600">
                  Products
                </Link>
                <div className="ml-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products/category/${category}`}
                      className="block text-sm text-gray-600 hover:text-blue-600"
                    >
                      {formatDashString(category, true)}
                    </Link>
                  ))}
                </div>
              </div>
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
