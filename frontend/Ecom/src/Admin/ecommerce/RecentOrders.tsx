import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { getProducts } from "../../Services/productService";

interface Product {
  _id: string;
  title: string;
  subTitle?: string;
  price: number | string;
  discountPrice?: number | string;
  image?: string;
}

export default function RecentOrders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        // Get the latest 5 products
        setProducts((data.products || []).slice(-5).reverse());
      } catch (error) {
        console.error("Failed to load dashboard products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Products
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest products added to your store
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        >
          See all
        </button>

      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No products found.
        </div>
      ) : (

        <div className="max-w-full overflow-x-auto">

          <Table>

            {/* Header */}
            <TableHeader className="border-gray-100 border-y dark:border-gray-800">

              <TableRow>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Product
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Subtitle
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>

              </TableRow>

            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">

              {products.map((product) => (

                <TableRow key={product._id}>

                  {/* Product */}
                  <TableCell className="py-3">

                    <div className="flex items-center gap-3">

                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}

                      </div>

                      <div>

                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.title}
                        </p>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          Product
                        </span>

                      </div>

                    </div>

                  </TableCell>

                  {/* Subtitle */}
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.subTitle || "-"}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-3">

                    <div className="flex flex-col">

                      {product.discountPrice ? (
                        <>
                          <span className="font-semibold text-gray-800 dark:text-white/90">
                            {product.discountPrice}
                          </span>

                          <span className="text-xs text-gray-400 line-through">
                            {product.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-gray-800 dark:text-white/90">
                          {product.price}
                        </span>
                      )}

                    </div>

                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3">

                    <Badge
                      size="sm"
                      color="success"
                    >
                      Available
                    </Badge>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      )}

    </div>
  );
}