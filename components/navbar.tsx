import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link className="hover:text-blue-600" href="/">
          My Ecommerce
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Homepage</Link>
          <Link className="hover:text-blue-600" href="/products">
            Products
          </Link>
          <Link className="hover:text-blue-600" href="/checkout">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4"></div>
      </div>
    </nav>
  );
};

export default Navbar;
