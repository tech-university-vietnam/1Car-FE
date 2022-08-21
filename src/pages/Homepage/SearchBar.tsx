import React from "react";

export default function SearchBar() {
  return (
    <div className="my-24 flex h-48 items-center justify-center">
      <div className="grid w-3/4 min-w-fit grid-cols-2 gap-x-4 divide-x rounded-md bg-gray-300 p-4 sm:flex sm:flex-row md:p-8">
        <div className="basis-1/2 flex-row">
          <div>Location</div>
          <input placeholder="Location"></input>
        </div>
        <div className="basis-1/6 flex-row">
          <div>Start date</div>
          <input placeholder="From"></input>
        </div>
        <div className="basis-1/6 flex-row">
          <div>End</div>
          <input placeholder="To"></input>
        </div>
        <div className="flex basis-1/6 place-content-center">
          <button className=" px-8">Search</button>
        </div>
      </div>
    </div>
  );
}
