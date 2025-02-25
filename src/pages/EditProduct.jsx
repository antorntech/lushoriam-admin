import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/1680x805"
  );
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("Beauty");
  const [fileKey, setFileKey] = useState(Date.now());
  const [uploadProgress, setUploadProgress] = useState(0);
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDetails(data.details);
        setPrice(data.price);
        setQuantity(data.quantity);
        setCategory(data.category);
        setImagePreview(`http://localhost:8000/${data.banner}`);
      });
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 50MB limit.");
      setFileKey(Date.now());
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set the image preview
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("banner", image);
    }
    formData.append("title", title);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/products/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();

      // Show success toast
      toast.success("Product updated successfully", {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to the products page
      navigate("/products");

      // Reset the form
      setImage(null);
      setImagePreview(null);
      setTitle("");
      setDetails("");
      setFileKey(Date.now());
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading file", error);
      // Reset the form in case of error
      setImage(null);
      setImagePreview(null);
      setTitle("");
      setDetails("");
      setFileKey(Date.now());
      setUploadProgress(0);
    }
  };

  const clearPreview = () => {
    setImage(null);
    setImagePreview("https://placehold.co/1680x805");
    setFileKey(Date.now());
    setUploadProgress(0);
  };

  const categories = [
    "Beauty",
    "Electronics",
    "Fashion",
    "Home",
    "Health",
    "Sports",
  ];

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-1 text-black border-2 border-black px-2 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-500"
        >
          <i className="fa-solid fa-hand-point-left"></i>
        </button>
        <div>
          <h1 className="text-xl font-bold">Edit Product</h1>
          <p className="text-sm text-gray-500">
            You can edit product details from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div>
            <Typography variant="h6" color="gray" className="mb-1 font-normal">
              Title
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter product title"
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary focus:!border-t-border-primary focus:ring-border-primary/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={title}
              name="title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Details
            </Typography>
            <Textarea
              value={details}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary focus:!border-t-border-primary focus:ring-border-primary/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleDetailsChange}
              rows={5}
              placeholder="Enter product details"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal"
              >
                Price
              </Typography>
              <input
                type="number"
                size="lg"
                placeholder="00.00 ৳"
                className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
                value={price}
                name="price"
                onChange={handlePriceChange}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal"
              >
                Quantity
              </Typography>
              <input
                type="number"
                size="lg"
                placeholder="0"
                className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
                value={quantity}
                name="quantity"
                onChange={handleQuantityChange}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal"
              >
                Category
              </Typography>
              <select
                value={category}
                name="category"
                onChange={handleCategoryChange}
                className="w-full p-2.5 rounded-md border border-gray-300  text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full md:w-[45%]">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal mt-2"
              >
                Banner
              </Typography>
              <input
                key={fileKey}
                type="file"
                onChange={handleImageChange}
                className=""
              />
              {uploadProgress > 0 && (
                <div className="mt-3">
                  <progress value={uploadProgress} max="100">
                    {uploadProgress}%
                  </progress>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="mt-5 bg-primary text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
        {imagePreview && (
          <div className="w-full md:w-1/2">
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2 ml-5"
            >
              Product Preview
            </Typography>
            <div className="relative w-full md:w-1/2 h-[400px] mt-5 md:mt-0 md:ml-5 border-[1px] border-gray-400 rounded-md">
              <button
                className="bg-red-800 text-white w-8 h-8 rounded-full absolute top-2 right-2 flex items-center justify-center"
                onClick={clearPreview}
              >
                <i className="fa-solid fa-xmark text-white"></i>
              </button>
              <img
                src={
                  imagePreview ? imagePreview : "https://placehold.co/1680x805"
                }
                alt="Selected"
                className="max-w-full h-full md:w-full object-cover rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
