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
      <AtlassianNavigation
        label="site"
        primaryItems={[
          <PrimaryButton>Home</PrimaryButton>,
          <PrimaryButton>About</PrimaryButton>,
          <PrimaryButton>Contact</PrimaryButton>,
        ]}
        renderProductHome={() => OneCarProductHome()}
        renderSignIn={OneCarSignIn}
      />
      <div className="h-full flex flex-col m-8 gap-4">
        <div className="  grid grid-cols-2 sm:flex sm:flex-row gap-x-4 divide-x bg-gray-300 rounded-md min-w-max">
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
        <div className="grid grid-cols-6 border-t-2 border-black">
          <button className="rounded bg-yellow-200 m-4">Brand</button>
          <button className="rounded bg-yellow-200 m-4">Type</button>
          <button className="rounded bg-yellow-200 m-4">Class</button>
          <button className="rounded bg-yellow-200 m-4">Fuel type</button>
          <div className="col-span-2 m-4">
            <button className="rounded bg-yellow-200 float-right w-32 h-12 shadow-lg">
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
