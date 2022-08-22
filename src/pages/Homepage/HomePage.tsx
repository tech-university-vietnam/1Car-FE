import React from "react";
import Header from "../../components/Header";
import SearchBar from "./SearchBar";
import { Select } from "antd";

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function HomePage() {
  const cars = Array.from(Array(10).keys()); //TODO change this
  return (
    <div className="h-screen">
      <Header />

      <div className="flex h-full flex-col gap-4 md:m-8">
        <SearchBar />
        <div className="grid grid-cols-2 border-t-2 border-black md:grid-cols-6">
          <select className="m-4 ml-0 h-8 min-w-fit rounded bg-yellow-200">
            <option value="volvo">Brand</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <select className="m-4 ml-0 h-8 min-w-fit rounded bg-yellow-200">
            <option value="volvo">Size</option>
            <option value="saab">Small</option>
            <option value="mercedes">Medium</option>
            <option value="audi">Large</option>
          </select>
          <select className="m-4 ml-0 h-8 min-w-fit rounded bg-yellow-200">
            <option value="volvo">Class</option>
          </select>
          <select className="m-4 ml-0 h-8 min-w-fit rounded bg-yellow-200">
            <option value="volvo">Fuel type</option>
            <option value="mercedes">Gas</option>
            <option value="audi">Electric</option>
          </select>
          <select className="m-4 ml-0 h-8 rounded bg-yellow-200 md:col-span-2 md:ml-auto">
            <option value="volvo">Sort by</option>
            <option value="saab">Date added</option>
            <option value="mercedes">Price</option>
            <option value="audi">Reviews</option>
          </select>
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
