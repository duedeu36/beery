import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white p-4 text-center" id="footer">
        Copyright &copy; {new Date().getUTCFullYear()} Beery
      </footer>
    </div>
  );
}
