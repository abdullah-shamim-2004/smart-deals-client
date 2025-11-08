import React from "react";
import useApi from "../Hooks/useApi";
// import useAuth from "../Hooks/useAuth";

const CreateAProduct = () => {
  const api = useApi();

  const handleProductCreate = async (e) => {
    e.preventDefault();
    const task = e.target;
    const title = task.title.value;
    const price_min = task.price_min.value;
    const price_max = task.price_max.value;
    const email = task.seller_email.value;
    const category = task.category.value;
    const created_at = new Date().toISOString;
    const image = task.image.value;
    const status = "pending";
    const location = task.location.value;
    const seller_image = task.seller_image.value;
    const seller_name = task.seller_name.value;
    const condition = task.price_min.value;
    const description = task.description.value;
    const seller_contact = task.seller_contact.value;
    const newProduct = {
      title,
      price_min,
      price_max,
      email,
      category,
      created_at,
      image,
      status,
      location,
      seller_image,
      seller_name,
      condition,
      description,
      seller_contact,
    };

    try {
      const res = await api.post("/products", newProduct);
      console.log("Product Added:", res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10">
      <form
        onSubmit={handleProductCreate}
        className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-3xl"
      >
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          type="button"
          className="btn btn-ghost mb-2 text-sm"
        >
          ← Back To Products
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Create <span className="text-purple-500">A Product</span>
        </h2>

        {/* Title + Category */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              //   value={formData.title}
              //   onChange={handleChange}
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              //   value={formData.category}
              //   onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select a Category</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Vehicles</option>
              <option>Books</option>
              <option>Fashion</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Min & Max Price */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label font-medium">
              Min Price You want to Sale (৳)
            </label>
            <input
              type="number"
              name="price_min"
              //   value={formData.price_min}
              //   onChange={handleChange}
              placeholder="e.g. 85000"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label font-medium">
              Max Price You want to Sale (৳)
            </label>
            <input
              type="number"
              name="price_max"
              //   value={formData.price_max}
              //   onChange={handleChange}
              placeholder="Optional (default = Min Price)"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Condition + Usage */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label font-medium">Product Condition</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="Brand New"
                  //   checked={formData.condition === "Brand New"}
                  //   onChange={handleChange}
                  className="radio radio-primary"
                />
                Brand New
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="Used"
                  //   checked={formData.condition === "Used"}
                  //   onChange={handleChange}
                  className="radio radio-primary"
                />
                Used
              </label>
            </div>
          </div>

          <div>
            <label className="label font-medium">Product Usage Time</label>
            <input
              type="text"
              name="usage"
              //   value={formData.usage}
              //   onChange={handleChange}
              placeholder="e.g. 1 year 3 months"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="label font-medium">Your Product Image URL</label>
          <input
            type="url"
            name="image"
            // value={formData.image}
            // onChange={handleChange}
            placeholder="https://..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Seller Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label font-medium">Seller Name</label>
            <input
              type="text"
              name="seller_name"
              //   value={formData.seller_name}
              //   onChange={handleChange}
              placeholder="e.g. Artisan Roasters"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label font-medium">Seller Email</label>
            <input
              type="email"
              name="seller_email"
              //   value={formData.seller_email}
              //   onChange={handleChange}
              placeholder="e.g. example@email.com"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Contact + Image */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label font-medium">Seller Contact</label>
            <input
              type="text"
              name="seller_contact"
              //   value={formData.seller_contact}
              //   onChange={handleChange}
              placeholder="e.g. +8801XXXXXXXXX"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-medium">Seller Image URL</label>
            <input
              type="url"
              name="seller_image"
              //   value={formData.seller_image}
              //   onChange={handleChange}
              placeholder="https://..."
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="label font-medium">Location</label>
          <input
            type="text"
            name="location"
            // value={formData.location}
            // onChange={handleChange}
            placeholder="City, Country"
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="label font-medium">
            Simple Description about your Product
          </label>
          <textarea
            name="description"
            // value={formData.description}
            // onChange={handleChange}
            placeholder="e.g. I bought this product 3 months ago, not used more than 2 times..."
            className="textarea textarea-bordered w-full min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
        >
          Create A Product
        </button>
      </form>
    </div>
  );
};

export default CreateAProduct;
