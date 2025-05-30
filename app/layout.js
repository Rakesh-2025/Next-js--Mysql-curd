import { Marcellus } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <h5 className="text-black text-bold border w-100 text-center p-3">
            Next Js + MySQl Connection Database 🐱‍👤
          </h5>
        </div>

        <nav className="d-flex justify-content-evenly bg-warning p-4">
          <div>
            <Link className="nav-link" href="/Create_user">
              Create user
            </Link>
          </div>
          <div>
            <Link className="nav-link" href="/Users">
              Users
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
