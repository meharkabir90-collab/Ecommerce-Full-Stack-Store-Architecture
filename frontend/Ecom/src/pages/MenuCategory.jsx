import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../Components/ProductCard/ProductCard";
import { getMenu } from "../Services/menuService";
import { getProductByCategory } from "../Services/productService";

const normalizePath = (path = "") => {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return pathname || "/";
};

function MenuCategory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError("");
      setCategory("");
      setProducts([]);

      try {
        const menuData = await getMenu();
        const menuItem = (menuData.menu || []).find(
          (item) =>
            item.parent &&
            normalizePath(item.url) === normalizePath(location.pathname)
        );

        if (!menuItem) {
          setError("This page does not exist.");
          return;
        }

        if (!active) return;
        setCategory(menuItem.title);

        const productData = await getProductByCategory(menuItem.title);
        if (active) {
          setProducts(productData.products || []);
        }
      } catch (fetchError) {
        console.error("Failed to load menu category products:", fetchError);
        if (active) {
          setError("Unable to load this category.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCategoryProducts();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  if (loading) {
    return <p className="mt-32 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="mt-32 text-center">{error}</p>;
  }

  return (
    <main className="mt-24 mb-16 w-full">
      <div className="flex flex-row justify-between bg-gray-100 px-5 py-4">
        <span className="text-gray-800">
          <NavLink
            to="/"
            className="cursor-pointer text-gray-400 hover:text-gray-700"
          >
            Home
          </NavLink>
          <span className="ml-2 mr-4 text-md text-gray-400">&gt;</span>
          {category}
        </span>

        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer text-gray-800 hover:text-gray-500"
        >
          Return to Previous Page
        </button>
      </div>

      <h1 className="mt-8 mb-10 text-center text-3xl font-bold">
        {category}
      </h1>

      {products.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="px-6 text-center text-gray-500">
          No products are assigned to this category yet.
        </p>
      )}
    </main>
  );
}

export default MenuCategory;