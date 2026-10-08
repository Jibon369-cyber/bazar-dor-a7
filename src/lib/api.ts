const API_BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

// All Categories
export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}

// Single Category
export async function getCategory(slug: string) {
  const res = await fetch(`${API_BASE_URL}/categories/${slug}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.status}`);
  }

  return res.json();
}

// All Products
export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

// Filter Products by Category
export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE_URL}/products?category=${category}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch filtered products: ${res.status}`);
  }

  return res.json();
}

// Single Product
export async function getProduct(id: number) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  return res.json();
}
