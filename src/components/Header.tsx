import React from "react";

export default function Header() {
  return (
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
  );
}
