import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className='group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg'>
      {/* Product Icon */}
      <div className="flex gap-2">
        <div className='flex items-center justify-baseline'>
          <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-5xl transition duration-300 group-hover:scale-105'>
            {product.image}
          </div>
        </div>

        {/* Product Info */}
        <div className='mt-5'>
          <h2 className='text-lg font-bold text-slate-900'>{product.nameBn}</h2>

          <p className='mt-1 text-sm text-slate-500'>প্রতি {product.unit}</p>
        </div>
      </div>

      {/* Price */}
      <div className='mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4'>
        <div>
          <p className='text-xs font-medium text-slate-500'>আজকের দাম</p>

          <p className='mt-1 text-xl font-bold text-slate-900'>
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        {/* Change Badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
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
    </Link>
  );
};

export default ProductCard;
