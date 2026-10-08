"use client";

import Link from "next/link";
import { useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  categories: Category[];
}

const NavLinks = ({ categories }: NavLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className='px-9 hidden items-center gap-5 lg:flex'>
        <Link
          href='/'
          className='text-sm font-medium text-slate-700 transition hover:text-green-700'>
          হোম
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className='text-sm font-medium text-slate-700 transition hover:text-green-700'>
            {category.icon} {category.nameBn}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-green-50 hover:text-green-700 lg:hidden'
        aria-label='মেনু খুলুন'>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='absolute left-0 top-full w-full border-t border-green-100 bg-white px-4 py-4 shadow-lg lg:hidden'>
          <nav className='flex flex-col gap-1'>
            <Link
              href='/'
              onClick={() => setIsOpen(false)}
              className='rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700'>
              🏠 হোম
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                onClick={() => setIsOpen(false)}
                className='rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700'>
                {category.icon} {category.nameBn}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default NavLinks;
