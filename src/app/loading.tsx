const Loading = () => {
  return (
    <main className='flex-1 bg-stone-50 px-4 py-8 sm:px-6 lg:px-9'>
      <div className='mx-auto max-w-7xl animate-pulse'>
        {/* Hero Skeleton */}
        <section className='grid gap-8 rounded-3xl border border-green-100 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10'>
          <div className='space-y-5'>
            <div className='skeleton h-5 w-32' />
            <div className='skeleton h-10 w-full max-w-lg' />
            <div className='skeleton h-5 w-full max-w-md' />
            <div className='skeleton h-5 w-3/4 max-w-md' />
            <div className='skeleton h-12 w-40 rounded-xl' />
          </div>

          <div className='skeleton h-56 w-full rounded-2xl sm:h-64' />
        </section>

        {/* Product Sections */}
        {[1, 2, 3].map((section) => (
          <section key={section} className='mt-10'>
            <div className='skeleton mb-3 h-8 w-56' />
            <div className='skeleton mb-6 h-4 w-72 max-w-full' />

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className='rounded-2xl border border-slate-200 bg-white p-4'>
                  <div className='skeleton mx-auto h-16 w-16 rounded-2xl' />
                  <div className='skeleton mt-4 h-4 w-full' />
                  <div className='skeleton mx-auto mt-3 h-6 w-3/4' />
                  <div className='skeleton mt-4 h-8 w-full rounded-lg' />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Loading;
