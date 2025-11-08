import React, { use, useEffect, useRef, useState } from "react";
// import { useLoaderData } from "react-router";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router";
import useApi from "../Hooks/useApi";

const ProductDetails = () => {
  // const product = useLoaderData();
  const id = useParams;
  const { api } = useApi();
  const [product, setProduct] = useState([]);
  const bidsModalRef = useRef(null);
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);

  //Get the product
  useEffect(() => {
    api
      .get(`/allproducts/${id}`)
      .then((res) => setProduct(res.data))
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Unothorized access");
        }
      });
  }, []);

  // Get bids data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/allproducts/bids/${product._id}`)
      .then((data) => {
        setBids(data.data);
      });
  }, [product._id]);

  //showmodal
  const handleBidsModal = () => {
    bidsModalRef.current.showModal();
  };
  const handleModalSubmit = (e) => {
    e.preventDefault();
    const ProductId = product._id;
    const body = e.target;
    const buyerName = body.buyerName.value;
    const buyerEmail = body.buyerEmail.value;
    const buyerImage = body.buyerImage.value;
    const price = body.price.value;
    // const contact = body.contact.value;
    // console.log(buyerName, buyerEmail, buyerImage, price, contact, ProductId);
    const newBids = {
      ProductId,
      buyerName,
      buyerEmail,
      buyerImage,
      price,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("New bids", data);
        if (data.insertedId) {
          console.log("succesfull");
          bidsModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Bids has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden shadow-md bg-base-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost text-sm"
          >
            ← Back To Products
          </button>

          <h1 className="text-3xl font-bold text-primary">{product.title}</h1>

          <div className="bg-base-100 p-4 rounded-lg shadow">
            <p className="text-2xl font-semibold text-green-600">
              ৳{product.price_min} - {product.price_max}
            </p>
            <p className="text-sm text-gray-500">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Product Details</h2>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Posted:</span>{" "}
              {new Date(product.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Condition:</span>{" "}
              {product.condition}
            </p>
            <p>
              <span className="font-semibold">Usage:</span> {product.usage}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Seller Information</h2>
            <div className="flex items-center gap-4">
              <img
                src={product.seller_image}
                alt={product.seller_name}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-medium">{product.seller_name}</p>
                <p className="text-sm text-gray-500">{product.email}</p>
                <p className="text-sm text-gray-500">{product.location}</p>
                <p className="text-sm text-gray-500">
                  Contact: {product.seller_contact}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Button */}
          <button
            onClick={handleBidsModal}
            className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full mt-4"
          >
            I Want to Buy This Product
          </button>
        </div>
      </div>

      <dialog ref={bidsModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleModalSubmit}
            className="bg-base-100 p-8 rounded-xl shadow-lg w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Give Seller Your Offered Price
            </h2>

            {/* Buyer Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Buyer Name</span>
                </label>
                <input
                  type="text"
                  name="buyerName"
                  //   value={formData.buyerName}
                  //   onChange={handleChange}
                  placeholder="Your name"
                  className="input input-bordered w-full"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Buyer Email</span>
                </label>
                <input
                  type="email"
                  name="buyerEmail"
                  //   value={formData.buyerEmail}
                  //   onChange={handleChange}
                  placeholder="Your email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            </div>

            {/* Buyer Image */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Buyer Image URL</span>
              </label>
              <input
                type="url"
                name="buyerImage"
                // value={formData.buyerImage}
                // onChange={handleChange}
                placeholder={user?.photoURL}
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
              />
            </div>

            {/* Offer Price */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Place your Price</span>
              </label>
              <input
                type="number"
                name="price"
                // value={formData.price}
                // onChange={handleChange}
                placeholder={product.price_max}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-medium">Contact Info</span>
              </label>
              <input
                type="text"
                name="contact"
                // value={formData.contact}
                // onChange={handleChange}
                placeholder="e.g. +8801XXXXXXXXX"
                className="input input-bordered w-full"
              />
            </div>
            {/* Buttons */}
            <div className="modal-action flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline btn-primary"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {/* Bids section */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>Byer</th>
              <th>Bid Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={bid?.buyerImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.buyerName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
