import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

const RisingProducts = async () => {
  const products: Product[] = await getProducts();

  const risingProducts: Product[] = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className='mx-4 my-10 sm:mx-6 lg:mx-9'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
          <span className='mr-2 text-green-600'>▲</span>
          আজ দাম বেড়েছে
        </h2>

        <p className='mt-2 text-sm text-slate-500 sm:text-base'>
          আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
        </p>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {risingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RisingProducts;
