"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
   LogoGithub,
} from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                I
              </div>

              <div>
                <h2 className="text-white font-bold text-xl leading-none">
                  Hire Loop
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Smart Inventory System
                </p>
              </div>
            </div>

            <p className="text-gray-500 leading-8 max-w-xs">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-5">
              Product
            </h3>

            <div className="flex flex-col gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
               Job discovery
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
               Worker AI
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
               Companies
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
               Salary data
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-5">
              Navigation
            </h3>

            <div className="flex flex-col gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                About
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
                Contact
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
                Help Center
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-5">
              Resources
            </h3>

            <div className="flex flex-col gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                Documentation
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>

              <Link href="#" className="text-gray-400 hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition">
              <LogoFacebook className="w-5 h-5 text-white" />
            </button>

            <button className="w-11 h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition">
              <LogoGithub className="w-5 h-5 text-white" />
            </button>

            <button className="w-11 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition">
              <LogoLinkedin className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026  Hire Loop. All rights reserved.
            </p>

            <div className="hidden md:block w-px h-4 bg-white/20"></div>

            <div className="flex gap-4 text-sm">
              <Link
                href="#"
                className="text-gray-500 hover:text-white"
              >
                Terms & Policy
              </Link>

              <Link
                href="#"
                className="text-gray-500 hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;