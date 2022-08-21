import React from "react";
import Header from "../../components/Header";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const cars = Array.from(Array(10).keys()); //TODO change this
  return (
    <div className="h-screen">
      <Header />

      <div className="flex h-full flex-col gap-4 md:m-8">
        <SearchBar />
        <div className="grid grid-cols-6 border-t-2 border-black">
          <button className="m-4 min-w-fit rounded bg-yellow-200">Brand</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">Type</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">Class</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">
            Fuel type
          </button>
          <button className="col-span-2 my-4 ml-auto h-12 w-32 rounded bg-yellow-200">
            Sort by
          </button>
        </div>
        <h1 className="text-2xl">Cars Found</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {/* TODO change this */}
          {cars.map((value, index) => (
            <div key={index} className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">
              Car
            </div>
          ))}
        </div>
        <footer>Footer</footer>
      </div>
    </div>
  );
}
