import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryProducts from "./CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (category: { slug: string }) => category.slug === slug,
  );

  if (!category) {
    return (
      <main className='flex min-h-[70vh] items-center justify-center px-4'>
        <div className='text-center'>
          <div className='text-6xl'>🔍</div>

          <h1 className='mt-5 text-3xl font-bold text-slate-900'>
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className='mt-3 text-slate-500'>
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href='/'
            className='mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800'>
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const products = await getProductsByCategory(category.slug);

  return (
    <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-9'>
      <div className='mx-auto max-w-7xl'>
        {/* Category Header */}
        <section className='rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-8 shadow-sm sm:px-8'>
          <div className='flex flex-col items-center text-center sm:flex-row sm:text-left'>
            <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm'>
              {category.icon}
            </div>

            <div className='mt-5 sm:ml-5 sm:mt-0'>
              <h1 className='text-3xl font-extrabold text-slate-900 sm:text-4xl'>
                {category.nameBn}
              </h1>

              <p className='mt-2 text-sm text-slate-500 sm:text-base'>
                {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের বাজারদর
                দেখুন।
              </p>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {products.length === 0 ? (
          <section className='flex min-h-[40vh] items-center justify-center'>
            <div className='text-center'>
              <div className='text-6xl'>📦</div>

              <h2 className='mt-5 text-2xl font-bold text-slate-900'>
                কোনো পণ্য পাওয়া যায়নি
              </h2>

              <p className='mt-3 text-slate-500'>
                এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
              </p>

              <Link
                href='/'
                className='mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800'>
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </section>
        ) : (
          <CategoryProducts products={products} />
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
