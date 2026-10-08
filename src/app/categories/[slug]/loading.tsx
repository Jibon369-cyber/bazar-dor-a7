const Loading = () => {
  return (
    <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-9'>
      <div className='mx-auto max-w-7xl'>
        {/* Header Skeleton */}
        <div className='animate-pulse rounded-3xl border border-slate-200 bg-white p-8'>
          <div className='flex items-center gap-5'>
            <div className='h-20 w-20 rounded-2xl bg-slate-200' />

            <div>
              <div className='h-8 w-40 rounded-lg bg-slate-200' />
              <div className='mt-3 h-4 w-56 rounded bg-slate-200' />
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='animate-pulse rounded-2xl border border-slate-200 bg-white p-5'>
              <div className='flex gap-3'>
                <div className='h-20 w-20 rounded-2xl bg-slate-200' />

                <div className='flex-1 pt-2'>
                  <div className='h-5 w-28 rounded bg-slate-200' />
                  <div className='mt-3 h-4 w-20 rounded bg-slate-200' />
                </div>
              </div>

              <div className='mt-6 border-t border-slate-100 pt-4'>
                <div className='h-3 w-20 rounded bg-slate-200' />
                <div className='mt-2 h-6 w-28 rounded bg-slate-200' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
