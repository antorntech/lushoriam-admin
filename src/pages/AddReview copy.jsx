import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/150x50"
  );
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [comments, setComments] = useState("");
  const [fileKey, setFileKey] = useState(Date.now());
  const [uploadProgress, setUploadProgress] = useState(0);
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("comments", comments);

    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      // Navigate to the reviews page
      navigate("/reviews");

      // Reset the form
      setImage(null);
      setImagePreview(null);
      setName("");
      setComments("");
      setFileKey(Date.now());
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading file", error);
      // Reset the form in case of error
      setImage(null);
      setImagePreview(null);
      setName("");
      setComments("");
      setFileKey(Date.now());
      setUploadProgress(0);
    }
  };

  const clearPreview = () => {
    setImage(null);
    setImagePreview("https://placehold.co/150x50");
    setFileKey(Date.now());
    setUploadProgress(0);
  };

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
          <h1 className="text-xl font-bold">Add Review</h1>
          <p className="text-sm text-gray-500">
            You can add review details from here.
          </p>
        </div>
      </div>
      <div className="mt-5 w-full md:flex">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full mb-5 flex items-center gap-3">
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal"
              >
                Name
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Enter client name"
                className="w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary focus:!border-t-border-primary focus:ring-border-primary/10"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={name}
                title="name"
                onChange={handleNameChange}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal"
              >
                Designation
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Enter client designation"
                className="w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary focus:!border-t-border-primary focus:ring-border-primary/10"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={designation}
                title="designation"
                onChange={handleDesignationChange}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="h6"
              color="gray"
              className="mb-1 font-normal mt-2"
            >
              Comments
            </Typography>
            <Textarea
              value={comments}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary focus:!border-t-border-primary focus:ring-border-primary/10"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleCommentsChange}
              rows={5}
              placeholder="Enter client comments"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full">
              <Typography
                variant="h6"
                color="gray"
                className="mb-1 font-normal mt-2"
              >
                Logo
              </Typography>
              <input key={fileKey} type="file" onChange={handleImageChange} />
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
            onClick={handleUpload}
            className="mt-5 bg-primary text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
        {imagePreview && (
          <div className="relative w-full md:w-1/2 h-[200px] mt-5 md:mt-0 md:ml-5 border-[1px] border-gray-400 rounded-md flex justify-center items-center">
            <button
              className="bg-red-800 text-white w-8 h-8 rounded-full absolute top-2 right-2 flex items-center justify-center"
              onClick={clearPreview}
            >
              <i className="fa-solid fa-xmark text-white"></i>
            </button>
            <img
              src={imagePreview ? imagePreview : "https://placehold.co/10x10"}
              alt="Selected"
              className="max-w-full h-full md:w-[150px] md:h-[150px] object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReview;
