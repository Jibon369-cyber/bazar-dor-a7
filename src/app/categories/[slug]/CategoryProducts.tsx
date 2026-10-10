"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/lib/types";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "low" | "high";

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const productList = [...products];

    if (sort === "low") {
      return productList.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      return productList.sort((a, b) => b.today - a.today);
    }

    return productList;
  }, [products, sort]);

  return (
    <section className='mt-10'>
      {/* Section Header */}
      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
            পণ্যসমূহ
          </h2>

          <p className='mt-1 text-sm text-slate-500'>
            আপনার পছন্দ অনুযায়ী পণ্য সাজিয়ে দেখুন।
          </p>
        </div>

        {/* Sort */}
        <div className='flex items-center gap-3'>
          <label
            htmlFor='sort'
            className='whitespace-nowrap text-sm font-medium text-slate-600'>
            সাজান:
          </label>

          <select
            id='sort'
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className='rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100'>
            <option value='default'>ডিফল্ট</option>
            <option value='low'>দাম: কম থেকে বেশি</option>
            <option value='high'>দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
