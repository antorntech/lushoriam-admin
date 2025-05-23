import { Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "https://lushoriam-server-abnd.vercel.app";

const EditReview = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/150x50"
  );
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [comments, setComments] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/v1/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data?.name);
        setDesignation(data?.designation);
        setComments(data?.comments);
        setAvatar(data?.avatar);
        setImagePreview(data?.avatar);
      });
  }, [id, navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleBannerChange = (e) => {
    setAvatar(e.target.value);
    setImagePreview(e.target.value);
  };

  const handleUpdate = () => {
    const data = {
      name,
      designation,
      comments,
      avatar,
    };
    try {
      fetch(`${API_URL}/api/v1/reviews/update/${id}`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Review updated successfully", {
            position: "top-right",
            hideProgressBar: false,
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/reviews");

          //  Reset the form
          setName("");
          setComments("");
          setAvatar("");
        });
    } catch (error) {
      console.error("Error updating review", error);
      //  Reset the form
      setName("");
      setComments("");
      setAvatar("");
    }
  };

  const clearPreview = () => {
    setAvatar("");
    setImagePreview("https://placehold.co/150x50");
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
          <h1 className="text-xl font-bold">Edit Review</h1>
          <p className="text-sm text-gray-500">
            You can edit review details from here.
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
              <input
                type="text"
                placeholder="Enter avatar url"
                className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:border-primary focus:border-t-border-primary focus:outline-none"
                value={avatar}
                name="avatar"
                onChange={handleBannerChange}
              />
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

export default EditReview;
