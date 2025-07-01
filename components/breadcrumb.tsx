"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  customTitle?: string;
}

function Breadcrumb({ customTitle }: BreadcrumbProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Handle special cases for better labels
      let label = segment;

      if (segment === "products") {
        label = "Products";
      } else if (segment === "category") {
        label = "Category";
      } else if (segment === "checkout") {
        label = "Checkout";
      } else if (segment === "success") {
        label = "Order Success";
      } else if (segments[index - 1] === "category") {
        // This is a category name, format it nicely
        label = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } else if (segments[index - 1] === "products" && segment !== "category") {
        // This is a product ID, we'll show a generic label or custom title
        label = customTitle || "Product Details";
      }

      const isCurrent = index === segments.length - 1;
      breadcrumbs.push({ label, href: currentPath, isCurrent });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 px-4" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />}

          {item.isCurrent ? (
            <span className="font-medium text-gray-900 truncate" aria-current="page">
              {index === 0 ? <HomeIcon className="h-4 w-4" /> : item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 transition-colors duration-200 truncate">
              {index === 0 ? <HomeIcon className="h-4 w-4" /> : item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumb;
