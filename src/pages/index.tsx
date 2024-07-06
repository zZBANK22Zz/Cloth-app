import React, { useState } from "react";
import MyNavbar from "./componant/Navbar";
import MyCard from "./componant/Card";
import { Button } from "@nextui-org/react";
import OpenProduct from './componant/openProduct';

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(arg0: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main className="bg-slate-300 min-h-screen">
      <MyNavbar />
      <div className="mt-6 ml-10">
        <h1 className="text-black font-bold text-2xl mb-4">All Clothes</h1>
      </div>
      
      <div className="px-10">
        <MyCard />
      </div>
      
      <div className="flex justify-start mt-4 mx-12">
        <ul className="flex list-none p-0">
          {[...Array(10)].map((_, index) => (
            <li key={index}>
              <button
                className={`px-4 py-2 mx-1 ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-xl`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
