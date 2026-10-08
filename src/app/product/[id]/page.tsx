import { getProduct } from "@/lib/api";

export const instant = false;

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;

  const product = await getProduct(Number(id));

  const prices = product.markets.flatMap((market) => [market.min, market.max]);

  const minimumPrice = Math.min(...prices);
  const maximumPrice = Math.max(...prices);
  const averagePrice = Math.round(
    prices.reduce((sum, price) => sum + price, 0) / prices.length,
  );

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-9'>
      <div className='mx-auto max-w-7xl'>
        {/* Product Summary */}
        <section className='overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-sm'>
          <div className='grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:p-10'>
            {/* Product Icon */}
            <div className='flex justify-center lg:justify-start'>
              <div className='flex h-32 w-32 items-center justify-center rounded-3xl bg-white text-7xl shadow-md ring-1 ring-green-100 sm:h-40 sm:w-40 sm:text-8xl'>
                {product.image}
              </div>
            </div>

            {/* Product Info */}
            <div className='text-center lg:text-left'>
              <div className='mb-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start'>
                <span className='rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700'>
                  {product.categoryIcon} {product.categoryNameBn}
                </span>

                <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600'>
                  প্রতি {product.unit}
                </span>
              </div>

              <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
                {product.nameBn}
              </h1>

              <p className='mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg'>
                {product.categoryNameBn} বিভাগের {product.nameBn}-এর আজকের
                বাজারদর ও বিভিন্ন বাজারের মূল্য এক নজরে দেখুন।
              </p>

              {/* Today's Price */}
              <div className='mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-end'>
                <div>
                  <p className='text-sm font-medium text-slate-500'>
                    আজকের দাম
                  </p>

                  <p className='mt-1 text-3xl font-extrabold text-green-700 sm:text-4xl'>
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    isUp
                      ? "bg-green-100 text-green-700"
                      : isDown
                        ? "bg-red-100 text-red-600"
                        : "bg-slate-100 text-slate-500"
                  }`}>
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className='mt-8'>
          <div className='mb-5'>
            <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
              দামের সারসংক্ষেপ
            </h2>

            <p className='mt-2 text-sm text-slate-500 sm:text-base'>
              বিভিন্ন বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-3'>
            {/* Minimum */}
            <div className='rounded-2xl border border-green-100 bg-white p-6 shadow-sm'>
              <p className='text-sm font-medium text-slate-500'>
                সর্বনিম্ন দাম
              </p>

              <p className='mt-2 text-2xl font-extrabold text-green-700'>
                {minimumPrice.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            {/* Maximum */}
            <div className='rounded-2xl border border-red-100 bg-white p-6 shadow-sm'>
              <p className='text-sm font-medium text-slate-500'>সর্বোচ্চ দাম</p>

              <p className='mt-2 text-2xl font-extrabold text-red-600'>
                {maximumPrice.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            {/* Average */}
            <div className='rounded-2xl border border-blue-100 bg-white p-6 shadow-sm'>
              <p className='text-sm font-medium text-slate-500'>গড় দাম</p>

              <p className='mt-2 text-2xl font-extrabold text-blue-700'>
                {averagePrice.toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className='mt-10'>
          <div className='mb-5'>
            <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className='mt-2 text-sm text-slate-500 sm:text-base'>
              বিভিন্ন এলাকার বাজার অনুযায়ী {product.nameBn}-এর দাম
            </p>
          </div>

          <div className='space-y-3'>
            {product.markets.map((market, index) => (
              <div
                key={`${market.market}-${index}`}
                className={`grid gap-3 rounded-2xl border px-5 py-5 shadow-sm transition md:grid-cols-[1fr_180px_220px] md:items-center md:px-6 ${
                  index % 2 === 0
                    ? "border-yellow-200 bg-yellow-50/60 hover:bg-yellow-50"
                    : "border-slate-200 bg-white hover:bg-green-50/50"
                }`}>
                {/* Market */}
                <div>
                  <p className='font-semibold text-slate-900'>
                    {market.market}
                  </p>

                  <p className='mt-1 text-xs text-slate-500 md:hidden'>
                    {market.division}
                  </p>
                </div>

                {/* Division */}
                <div className='hidden md:block'>
                  <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
                    {market.division}
                  </span>
                </div>

                {/* Price */}
                <div>
                  <p className='text-lg font-bold text-green-700'>
                    {market.min.toLocaleString("bn-BD")} –{" "}
                    {market.max.toLocaleString("bn-BD")} টাকা
                  </p>

                  <p className='mt-1 text-xs text-slate-400'>
                    সর্বনিম্ন – সর্বোচ্চ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailPage;
