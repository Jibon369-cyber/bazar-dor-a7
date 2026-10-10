import Link from "next/link";

const NotFound = () => {
  return (
    <main className='flex flex-1 items-center justify-center bg-stone-50 px-4 py-16'>
      <div className='w-full max-w-lg text-center'>
        <div className='mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-green-100 text-6xl shadow-sm'>
          🛒
        </div>

        <p className='mt-8 text-sm font-bold uppercase tracking-[0.2em] text-green-700'>
          Error 404
        </p>

        <h1 className='mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl'>
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className='mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base'>
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। লিংকটি ভুল হতে পারে
          অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800'>
            🏠 হোম পেজে ফিরে যান
          </Link>

          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100'>
            বাজার দর দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
