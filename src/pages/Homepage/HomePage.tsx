import React from "react";

export default function HomePage() {
  return (
    <div className="h-screen">
      <header className="flex items-center p-2 shadow-sm">
        <img src={"logo192.png"} className="w-16" />
        <ul className="ml-8 flex items-center">
          <li className="mr-4">Home</li>
          <li className="mr-4">About</li>
          <li className="mr-4">More</li>
        </ul>
        <div className="ml-auto flex items-center">
          <button className="mr-2">Sign In</button>
          <button className="bg-red-500 p-2">Sign Up</button>
        </div>
      </header>

      <div className="m-8 flex h-full flex-col gap-4">
        <div className="my-24 flex h-48 items-center justify-center">
          <div className="grid w-3/4 min-w-fit grid-cols-2 gap-x-4 divide-x rounded-md bg-gray-300 p-8 sm:flex sm:flex-row">
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
        <div className="grid grid-cols-6 border-t-2 border-black">
          <button className="m-4 min-w-fit rounded bg-yellow-200">Brand</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">Type</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">Class</button>
          <button className="m-4 min-w-fit rounded bg-yellow-200">
            Fuel type
          </button>
          <div className="col-span-2 m-4">
            <button className="float-right h-12 w-32 rounded bg-yellow-200">
              Sort by
            </button>
          </div>
        </div>
        <h1 className="text-2xl">Cars Found</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
          <div className="h-96 w-96 bg-blue-300 md:h-80 md:w-80">Car</div>
        </div>
        <footer>Footer</footer>
      </div>
    </div>
  );
}
