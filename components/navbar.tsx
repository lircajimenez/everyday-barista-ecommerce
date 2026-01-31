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

  // Common nav link classes with hover effect for border and text
  const navLinkClasses = "relative border-b-2 border-transparent text-[#F1F3F3] text-xl font-extrabold tracking-wider hover:border-[#EBA22C] hover:text-[#EBA22C] transition-colors pb-1";

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
    <nav className="sticky top-0 z-50 bg-[#15100F] shadow">
      <div className="container mx-auto flex items-center justify-between px-1 py-3">
        <Link href="/">
          <Image alt="Everyday Barista logo" width={50} height={50} src={logo} />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={navLinkClasses}>
            Homepage
          </Link>
          <Link href="/" className={navLinkClasses}>
            About Us
          </Link>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link
              className={`flex items-center space-x-1 ${navLinkClasses}`}
              href="/products"
            >
              <span>Products</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Link>
            {productsDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-50 bg-[#15100F] rounded-md shadow-lg py-2 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products/category/${category}`}
                    className="block px-4 py-2 text-lg text-[#F1F3F3] hover:bg-[#EBA22C] transition-colors"
                  >
                    {formatDashString(category, true)}
                  </Link>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link href="/products" className="block px-4 py-2 text-lg text-[#F1F3F3] hover:bg-[#EBA22C] transition-colors font-medium">
                    View All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="relative group" href="/products">
            <MagnifyingGlassIcon className="h-6 w-6 text-[#F1F3F3] transition-colors group-hover:text-[#EBA22C]" />
          </Link>
          <Link className="relative group" href="/checkout">
            <ShoppingCartIcon className="h-6 w-6 text-[#F1F3F3] transition-colors group-hover:text-[#EBA22C]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button className="md:hidden" variant="ghost" onClick={() => setMobileOpen((prev) => !prev)}>
            {mobileOpen ? <XMarkIcon className="h-6 w-6 text-[#F1F3F3]" /> : <Bars3Icon className="h-6 w-6 text-[#F1F3F3]" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link
                href="/"
                className="inline-block hover:text-black relative border-b-2 border-transparent hover:border-black transition-colors pb-1"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="space-y-1">
                <Link
                  href="/products"
                  className="inline-block hover:text-black relative border-b-2 border-transparent hover:border-black transition-colors pb-1"
                >
                  Products
                </Link>
                <div className="ml-4 space-y-1">
                  {categories.map((category) => (
                    <Link key={category} href={`/products/category/${category}`} className="block text-sm text-gray-600 hover:text-black">
                      {formatDashString(category, true)}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/checkout"
                className="inline-block hover:text-black relative border-b-2 border-transparent hover:border-black transition-colors pb-1"
              >
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
