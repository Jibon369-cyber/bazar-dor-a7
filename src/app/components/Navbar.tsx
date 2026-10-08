

import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts,} from "@/lib/api";
import NavLinks from "./NavLinks";
import CurrentDate from "./CurrentDate";
import ProductMarquee from "./ProductMarquee";

const Navbar = async () => {
  const categories = await getCategories();
  const products = await getProducts();

  
  return (
    <header className='sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-md'>
      <div className='flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8'>
        {/* Logo & Brand */}
        <Link href='/' className='flex min-w-0 items-center gap-3'>
          <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-700 p-2 shadow-sm'>
            <Image
              src='/logo-icon.png'
              width={50}
              height={50}
              alt='বাজার দর লোগো'
              className='h-full w-full object-contain'
            />
          </div>

          <div className='min-w-0'>
            <h1 className='truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl'>
              বাজার দর
            </h1>

            <CurrentDate/>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className='flex shrink-0 items-center gap-2'>
          <Link
            href='/sign-in'
            className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:px-4'>
            সাইন ইন
          </Link>

          <Link
            href='/sign-up'
            className='rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-800 sm:px-4'>
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <NavLinks categories={categories} />
      <ProductMarquee products={products}/>
    </header>
  );
};

export default Navbar;
