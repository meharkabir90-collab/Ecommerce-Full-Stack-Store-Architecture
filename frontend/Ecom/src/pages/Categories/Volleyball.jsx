import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { getProductByCategory } from "../../Services/productService";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Volleyball = () => {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchVolleyballProducts = async () => {
			try {
				const response = await getProductByCategory("VOLLEYBALL");

				setProducts(response.products || []);
			} catch (error) {
				console.error("Error fetching volleyball products:", error);
				setError("Failed to load volleyball products");
			} finally {
				setLoading(false);
			}
		};

		fetchVolleyballProducts();
	}, []);

	if (loading) {
		return <p>Loading Volleyball products...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="mt-24 mb-16 w-full">
			<div className="flex flex-row justify-between bg-gray-100 px-5 py-4">
				<span className="text-gray-800">
					<NavLink
						to="/"
						className="cursor-pointer text-gray-400 hover:text-gray-700"
					>
						Home
					</NavLink>
					<span className="ml-2 mr-4 text-md text-gray-400">&gt;</span>
					Volleyball
				</span>

				<button
					onClick={() => navigate(-1)}
					className="cursor-pointer text-gray-800 hover:text-gray-500"
				>
					Return to Previous Page
				</button>
			</div>

			<section className="mt-6 mb-[-150px] flex items-center justify-center gap-4 text-3xl font-bold">
				<hr className="w-96 border-t-2 border-gray-200" />
				<h1 style={{ fontFamily: "Poppins" }}>VOLLEYBALL</h1>
				<hr className="w-96 border-t-2 border-gray-200" />
			</section>

			<div className="w-full px-6">
				<div className="grid w-full grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Volleyball;
