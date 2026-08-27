import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block"
    >
      <div className="mt-56 overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* Product Image */}
        <div className="h-56 w-full overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="p-4">

          <h3 className="truncate text-lg font-semibold text-gray-900">
            {product.title}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-500">
            {product.subTitle}
          </p>

          <div className="mt-3 flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  Rs. {product.discountPrice}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                Rs. {product.price}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-400">
            SKU: {product.sku}
          </p>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;