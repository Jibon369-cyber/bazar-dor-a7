import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

const AllProducts = async () => {
  const products: Product[] = await getProducts();

  return (
    <section id='সব-পণ্য' className='mx-4 my-10 scroll-mt-32 sm:mx-6 lg:mx-9'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
          সব পণ্য
        </h2>

        
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
