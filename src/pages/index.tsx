import React from "react";
import MyNavbar from "./componant/Navbar";
import MyCard from "./componant/Card";

export default function Home() {
  return (
    <main className="bg-slate-300 min-h-screen">
      <MyNavbar />
      <div className="mt-6 ml-10">
        <h1 className="text-black font-bold text-2xl mb-4">All Clothes</h1>
      </div>
      <div className="px-10">
        <MyCard />
      </div>
    </main>
  );
}
