import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { image, title, _id, price_min, condition } = product;
  return (
    <div className="card bg-base-100 w-fit md:w-96 shadow-md hover:shadow-xl transition duration-300 border border-gray-100 animate__animated hover:animate__pulse">
      <figure className="px-5 pt-5">
        <img
          src={image}
          //   alt={serviceName}
          className="rounded-xl h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-base font-medium text-gray-600">
            Price:{" "}
            <span className="text-gray-800 font-semibold">${price_min}</span>
          </p>
          <div className="flex justify-center items-center gap-2 text-yellow-500">
            <p className="text-sm font-medium text-gray-700">{condition}</p>
          </div>
        </div>

        <div className="card-actions  w-full mt-3">
          <Link to={`/allproducts/${_id}`}>
            <button className="btn btn-outline btn-primary btn-sm">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
