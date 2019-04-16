import React from "react";

export default function Footer() {
  return (
    <div>
      <h1>Footer</h1>
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getUTCFullYear()} Beery
      </footer>
    </div>
  );
}
