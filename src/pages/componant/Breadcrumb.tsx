import React from "react";
import Link from "next/link";

const Breadcrumb: React.FC<{ current: string }> = ({ current }) => {
  return (
    <nav className="bg-gray-100 p-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/shop">
            <span className="text-gray-400">All Products</span>
          </Link>
        </li>
        <li className="text-gray-400">{">"}</li>
        <li className="text-black font-bold">{current}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;