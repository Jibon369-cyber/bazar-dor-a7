"use client";

import Marquee from "react-fast-marquee";
import { Product } from "@/lib/types";

interface ProductMarqueeProps {
  products: Product[];
}

const ProductMarquee = ({ products }: ProductMarqueeProps) => {
  return (
    <Marquee
      direction='left'
      speed={100}
      className='mt-3 border-y border-green-200 bg-white py-2 shadow-sm'>
      {products.map((product) => (
        <div
          key={product.id}
          className='mx-4 flex items-center gap-2 whitespace-nowrap'>
          <span>{product.categoryIcon}</span>

          <span className='font-medium text-slate-800'>{product.nameBn}</span>

          <span className='text-slate-600'>
            ৳ {product.today}/{product.unit}
          </span>

          <span
            className={
              product.change.dir === "up"
                ? "font-semibold text-red-600"
                : product.change.dir === "down"
                  ? "font-semibold text-green-600"
                  : "font-semibold text-slate-500"
            }>
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {product.change.pct}%
          </span>
        </div>
      ))}
    </Marquee>
  );
};

export default ProductMarquee;
