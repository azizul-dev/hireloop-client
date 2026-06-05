"use client";

import { useState } from "react";
import { Button, Link } from "@heroui/react";
import { signOut, useSession,} from "@/lib/auth-client";

const links = [
  {
    name: "Browse Jobs",
    href: "#",
  },
  {
    name: "Company",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#111118]">
      <header className="mx-auto flex h-16 max-w-6xl items-center px-6">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-700">
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-white">
              <h1 className=" text-lg font-bold">Hire Loop</h1>
            </span>
          </div>
        </Link>

        {/* Right Side */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          {/* Desktop Nav Links */}
          <ul className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.05] px-2 py-1.5 list-none">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-4 py-1.5 text-sm font-medium text-white/75 no-underline transition hover:bg-white/[0.08] hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-8 w-px bg-white/20" />
          {/* Desktop Actions */}
          <div className="flex items-center gap-1">
            {user ? (
              <>
                Hi, {user.name}!
                <Button onClick={handleSignOut} variant="ghost">
                  SignOut
                </Button>
              </>
            ) : (
              <Link
                href="/signin"
                className="rounded-lg px-5 py-2 text-sm font-semibold text-violet-500 no-underline transition hover:bg-violet-500/10"
              >
                Sign In
              </Link>
            )}

            <Button
              className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="ml-auto text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#111118] md:hidden">
          <ul className="flex flex-col gap-1 p-4 list-none">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-white/75 no-underline hover:bg-white/[0.08] hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3">
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-semibold text-violet-500 no-underline"
              >
                Sign In
              </Link>

              <Button
                className="w-full rounded-lg bg-white text-sm font-semibold text-black"
                size="sm"
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
