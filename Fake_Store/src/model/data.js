export async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories'); 
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
}

export async function fetchProducts(categoryItem) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${categoryItem}`)
      if (!response.ok) {
         throw new Error('Failed to fetch products'); 
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
}

export async function fetchProduct(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch the product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching the product:', error);
  }
}