import Link from "next/link";
import CurrentDate from "./CurrentDate";
import Image from "next/image";

const Banner = () => {
  return (
    <section className='mx-4 my-6 overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-lg ring-1 ring-green-100 sm:mx-6 lg:mx-9'>
      <div className='flex flex-col items-center justify-between gap-8 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:px-12 lg:px-16 lg:py-12'>
        {/* Content */}
        <div className='w-full text-center md:w-1/2 md:text-left'>
          <div className='mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700'>
            <CurrentDate />
          </div>

          <h1 className='text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
            আজকের বাজারদর
            <span className='block text-green-700'>এক নজরে</span>
          </h1>

          <p className='mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg'>
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম
            এক নজরে দেখে নিন।
          </p>

          <Link
            href='/products'
            className='mt-7 inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-green-800 hover:shadow-lg active:scale-95 sm:px-7 sm:py-3.5 sm:text-base'>
            সব পণ্যের দাম দেখুন
            <span className='ml-2 text-lg'>→</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className='flex w-full justify-center md:w-1/2 md:justify-end'>
          <div className='relative'>
            <div className='absolute inset-0 -z-0 rounded-full bg-green-200/40 blur-3xl' />

            <Image
              src='/bazar-hero.png'
              width={450}
              height={450}
              alt='বাজারের পণ্যের ছবি'
              priority
              className='relative z-10 h-auto w-64 object-contain drop-shadow-xl sm:w-80 lg:w-[400px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
