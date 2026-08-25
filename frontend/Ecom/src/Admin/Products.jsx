import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProducts, deleteProduct } from "../Services/productService";
import { Pencil, Trash2, Plus, SortAsc } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // ==========================================
  // GET PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      const productData = data.products || [];

      setProducts(productData);
      setAllProducts(productData);

    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      setAllProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // ==========================================
  // SEARCH PRODUCTS
  // ==========================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    const search = value.trim().toLowerCase();

    if (!search) {
      setProducts(allProducts);
      return;
    }

    const filteredProducts = allProducts.filter((product) => {

      const title =
        product.title?.toLowerCase() || "";

      const sku =
        product.sku?.toLowerCase() || "";

      return (
        title.includes(search) ||
        sku.includes(search)
      );

    });

    setProducts(filteredProducts);
  };

  //sorting
  const handleSort = (e) => {
  const sort = e.target.value;

  setSortBy(sort);

  const sortedProducts = [...products];

  if (sort === "title-asc") {
    sortedProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sort === "title-desc") {
    sortedProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  if (sort === "sku-asc") {
    sortedProducts.sort((a, b) =>
      a.sku.localeCompare(b.sku)
    );
  }

  if (sort === "sku-desc") {
    sortedProducts.sort((a, b) =>
      b.sku.localeCompare(a.sku)
    );
  }

  setProducts(sortedProducts);
};

  
const handleFilter = (e) => {
  const category = e.target.value;

  setFilterCategory(category);

  if (!category) {
    setProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter(
    (product) => {
      const categories = product.category?.toLowerCase() || "";

      return(
        categories.includes(category)
      )

});

  setProducts(filteredProducts);
};

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Product management
            </p>

            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Featured Products
            </h2>

          </div>

          <NavLink
            to="/admin/products/add"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Product
          </NavLink>

        </div>


        {/* SEARCH */}

     <div className="flex flex-row justify-between items-center mb-6">

  {/* SEARCH */}

  <div className="flex items-center w-96">

    <input
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search products by title or SKU..."
      type="text"
      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg outline-none focus:border-black"
    />

    <button
      type="button"
      className="bg-black text-white px-4 py-2 rounded-r-lg"
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
      />
    </button>

  </div>


  {/* SORT + FILTER */}

  <div className="flex items-center gap-3">

    {/* SORT */}

    <select
      value={sortBy}
      onChange={handleSort}
      className="px-3 py-2 border rounded-lg border-gray-300 bg-white outline-none"
    >
      <option value="">
        Sort
      </option>

      <option value="title-asc">
        Title A-Z
      </option>

      <option value="title-desc">
        Title Z-A
      </option>

      <option value="sku-asc">
        SKU A-Z
      </option>

      <option value="sku-desc">
        SKU Z-A
      </option>

    </select>


    {/* FILTER */}

    <select
      value={filterCategory}
      onChange={handleFilter}
      className="px-3 py-2 border rounded-lg border-gray-300 bg-white outline-none"
    >
      <option value="">
        All Categories
      </option>

      <option value="football">
        FOOTBALL KIT
      </option>

      <option value="baseball">
        BASEBALL KIT
      </option>

      <option value="basketball">
        BASKETBALL KIT
      </option>

    </select>

  </div>

</div>


        {/* TABLE */}

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">

          {products.length === 0 ? (

            <div className="px-5 py-12 text-center">

              <p className="text-sm text-stone-400">
                No products found.
              </p>

            </div>

          ) : (

            <table className="w-full text-sm border-collapse">

              <thead>

                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-stone-400 border-b border-stone-200">

                  <th className="px-5 py-3">
                    Image
                  </th>

                  <th className="px-5 py-3">
                    Title
                  </th>

                  <th className="px-5 py-3">
                    SKU
                  </th>

                  <th className="px-5 py-3">
                    Subtitle
                  </th>

                  <th className="px-5 py-3">
                    Price
                  </th>

                  <th className="px-5 py-3">
                    Discount Price
                  </th>

                  <th className="px-5 py-3 text-right">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors"
                  >

                    {/* IMAGE */}

                    <td className="px-5 py-3">

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-14 h-14 object-cover rounded-lg border border-stone-200"
                        />

                      ) : (

                        <div className="w-14 h-14 rounded-lg bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                          No image
                        </div>

                      )}

                    </td>


                    {/* TITLE */}

                    <td className="px-5 py-3">

                      <span className="font-medium text-stone-800">
                        {product.title}
                      </span>

                    </td>


                    {/* SKU */}

                    <td className="px-5 py-3">

                      <span className="text-stone-500 text-xs">
                        {product.sku}
                      </span>

                    </td>


                    {/* SUBTITLE */}

                    <td className="px-5 py-3">

                      <span className="text-stone-500 text-xs">
                        {product.subTitle}
                      </span>

                    </td>


                    {/* PRICE */}

                    <td className="px-5 py-3">

                      <span className="text-stone-700 font-semibold">
                        {product.price}
                      </span>

                    </td>


                    {/* DISCOUNT PRICE */}

                    <td className="px-5 py-3">

                      <span className="text-stone-700 font-semibold">
                        {product.discountPrice || "-"}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-3">

                      <div className="flex items-center justify-end gap-1">

                        <NavLink
                          to={`/admin/products/edit/${product._id}`}
                          aria-label={`Edit ${product.title}`}
                          className="p-1.5 rounded-md text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <Pencil size={15} />
                        </NavLink>

                        <button
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          aria-label={`Delete ${product.title}`}
                          className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default Products;