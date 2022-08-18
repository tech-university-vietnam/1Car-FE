import {
  AtlassianNavigation,
  CustomProductHome,
  PrimaryButton,
  PrimaryDropdownButton,
  SignIn,
} from "@atlaskit/atlassian-navigation";
import React from "react";

const OneCarProductHome = () => (
  <CustomProductHome
    href="#"
    iconAlt="1Car"
    iconUrl={"logo192.png"}
    logoAlt="1Car"
    logoUrl={"logo192.png"}
    logoMaxWidth={300}
  />
);

const OneCarSignIn = () => <SignIn href="#" tooltip="Sign in" />;

export default function HomePage() {
  return (
    <div className="h-screen">
      <header className="flex items-center p-2 shadow-sm">
        <img src={"logo192.png"} className="w-16" />
        <ul className="flex items-center ml-8">
          <li className="mr-4">Home</li>
          <li className="mr-4">About</li>
          <li className="mr-4">More</li>
        </ul>
        <div className="ml-auto flex items-center">
          <button className="mr-2">Sign In</button>
          <button className="p-2 bg-red-500">Sign Up</button>
        </div>
      </header>

      <div className="h-full flex flex-col m-8 gap-4">
        <div className="h-48 my-24 flex justify-center items-center">
          <div className="p-8 grid grid-cols-2 sm:flex sm:flex-row gap-x-4 divide-x bg-gray-300 rounded-md w-3/4 min-w-fit">
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
            <div className="basis-1/6 flex place-content-center">
              <button className="">Search</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-t-2 border-black">
          <button className="rounded bg-yellow-200 m-4">Brand</button>
          <button className="rounded bg-yellow-200 m-4">Type</button>
          <button className="rounded bg-yellow-200 m-4">Class</button>
          <button className="rounded bg-yellow-200 m-4">Fuel type</button>
          <div className="col-span-2 m-4">
            <button className="rounded bg-yellow-200 float-right w-32 h-12">
              Sort by
            </button>
          </div>
        </div>
        <h1 className="text-2xl">Cars Found</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
          <div className="w-96 h-96 md:w-80 md:h-80 bg-blue-300">Car</div>
        </div>
        <footer>Footer</footer>
      </div>
    </div>
  );
}
