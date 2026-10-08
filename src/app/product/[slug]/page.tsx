import { getProduct } from "@/lib/api";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const product = await getProduct(slug);
  console.log(product);

  return (
    <div>
      <h1>Product Detail Page</h1>
    </div>
  );
};

export default ProductDetailPage;