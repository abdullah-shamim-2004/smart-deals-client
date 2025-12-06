import React, { use } from "react";
import Products from "./Products";
import { Link } from "react-router";


const LatestProducts = ({ LatestProductsPromise }) => {
  const products = use(LatestProductsPromise);


  return (
    <div>
      {" "}
      <div className="my-10">
        <div className="text-center space-y-1.5">
          <h1 className="text-4xl text-primary font-bold mb-1.5">
            Popular Winter Care Services
          </h1>
          <p className="text-gray-700">
            Explore All deals here
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
          {products.map((product) => (
            <Products key={product._id} product={product}></Products>
          ))}
        </div>

        <div className="flex justify-end">
          <Link to="/allproducts">
            <button className="btn shadow-lg border-none text-white text-xl font-bold my-15 bg-primary hover:scale-105 transition ease-in-out">
              Show All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;
